from loguru import logger as log

def setup_logger():
    log.remove()  # Remove default logger
    log.add(
        "app/logs/app.log",
        rotation="10 MB",  # Rotate log file after it reaches 10 MB
        retention="7 days",  # Keep logs for 7 days
        compression="zip",  # Compress rotated logs
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",  # Custom log format
        level="DEBUG"  # Set log level to DEBUG
    )




logger = log