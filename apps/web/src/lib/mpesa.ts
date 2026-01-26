// lib/mpesa.ts

export async function getMpesaToken() {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
    const data = await response.json();
    console.log(data);
  return data.access_token;
}

export async function initiateSTKPush(
  phone: string,
  amount: number,
  orderId: string
) {
  const token = await getMpesaToken();
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);
  const password = Buffer.from(
    `${process.env.MPESA_BUSINESSS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  // Format phone to 2547XXXXXXXX
  const formattedPhone = phone.startsWith("0")
    ? `254${phone.slice(1)}`
    : phone.replace("+", "");

  const payload = {
    BusinessShortCode: process.env.MPESA_BUSINESSS_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(amount),
    PartyA: formattedPhone,
    PartyB: process.env.MPESA_BUSINESSS_SHORTCODE,
    PhoneNumber: formattedPhone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "EverythingKE",
    TransactionDesc: orderId,
    };
    
    console.log(payload);

  const response = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
    
    const data = await response.json();
  console.log(data);

  return data;
}
