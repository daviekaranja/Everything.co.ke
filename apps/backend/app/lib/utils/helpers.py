from datetime import datetime, timezone


def utc_now() -> datetime:
    """Return current UTC time as a timezone-aware datetime."""
    return datetime.now(timezone.utc)


def utc_today() -> datetime:
    """Return today's date in UTC (00:00:00)."""
    now = utc_now()
    return datetime(year=now.year, month=now.month, day=now.day, tzinfo=timezone.utc)
