# mpesa_client.py
"""
Flexible M-Pesa client – single file, supports multiple shortcodes/accounts.
Pass your own config to MpesaClient(config) or use MpesaClient.from_env()
"""

from __future__ import annotations

import base64
from datetime import datetime, timedelta, timezone

from app.lib.utils.logger_setup import logger

import httpx


from app.core.config import MpesaConfig, MpesaSettings

prefix = "/payments"


# ──────────────────────────────────────────────
# Client – one instance per config/shortcode
# ──────────────────────────────────────────────
class MpesaClient:
    def __init__(self, config: MpesaConfig):
        self.config = config
        self._token: str | None = None
        self._token_expiry: datetime | None = None
        self._http = httpx.AsyncClient(timeout=15.0, http2=True)
        self.confirmation_url = f"{prefix}/confirmation"
        self.validation_url = f"{prefix}/validation"
        self.callback_url = f"{prefix}/stk-callback"

    @classmethod
    def from_env(cls) -> MpesaClient:
        """Convenience for single-account projects."""
        settings = MpesaSettings()
        return cls(settings)

    def read_configs(self):
        return self.config

    async def _get_token(self) -> str:
        if (
            self._token
            and self._token_expiry
            and self._token_expiry > datetime.now(timezone.utc)
        ):
            logger.debug("Token is still active")
            return self._token

        logger.debug("Requesting a token")
        auth = base64.b64encode(
            f"{self.config.consumer_key.get_secret_value()}:{self.config.consumer_secret.get_secret_value()}".encode()
        ).decode()

        resp = await self._http.get(
            self.config.oauth_url, headers={"Authorization": f"Basic {auth}"}
        )
        resp.raise_for_status()
        data = resp.json()

        self._token = data["access_token"]
        self._token_expiry = datetime.now(timezone.utc) + timedelta(
            seconds=int(data["expires_in"]) - 60
        )
        return self._token

    async def _post(self, url: str, json: dict) -> dict:
        token = await self._get_token()
        resp = await self._http.post(
            url, json=json, headers={"Authorization": f"Bearer {token}"}
        )
        resp.raise_for_status()
        return resp.json()

    # ── C2B Registration (call once per shortcode) ──
    async def register_c2b_urls(self) -> dict:
        payload = {
            "ShortCode": self.config.shortcode,
            "ResponseType": "Completed",
            "ConfirmationURL": f"{self.config.callback_base_url.rstrip('/')}{self.confirmation_url}",
            "ValidationURL": f"{self.config.callback_base_url.rstrip('/')}{self.validation_url}",
        }
        return await self._post(self.config.register_url, payload)

    # ── STK Push (Lipa na M-Pesa Online) ──
    async def stk_push(
        self,
        phone: str,  # 2547xxxxxxxx
        amount: int,
        account_reference: str,
        transaction_desc: str = "Payment",
    ) -> dict:
        if not self.config.passkey:
            raise ValueError("passkey is required for STK Push")

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            f"{self.config.shortcode}{self.config.passkey.get_secret_value()}{timestamp}".encode()
        ).decode()

        payload = {
            "BusinessShortCode": self.config.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": self.config.shortcode,
            "PhoneNumber": phone,
            "CallBackURL": f"{self.config.callback_base_url.rstrip('/')}{self.callback_url}",
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc,
        }
        return await self._post(self.config.stk_push_url, payload)

    # ── Query STK status ──
    async def query_stk(self, checkout_request_id: str) -> dict:
        if not self.config.passkey:
            raise ValueError("passkey is required for STK query")
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            f"{self.config.shortcode}{self.config.passkey.get_secret_value()}{timestamp}".encode()
        ).decode()

        payload = {
            "BusinessShortCode": self.config.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "CheckoutRequestID": checkout_request_id,
        }
        return await self._post(self.config.stk_query_url, payload)


config = MpesaSettings()

mpesa_client = MpesaClient(config)
