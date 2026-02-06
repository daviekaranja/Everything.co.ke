# from loguru import logger as log
#
#
# def setup_logger():
#     log.remove()  # Remove default logger
#     log.add(
#         "app/logs/app.log",
#         rotation="10 MB",  # Rotate log file after it reaches 10 MB
#         retention="7 days",  # Keep logs for 7 days
#         compression="zip",  # Compress rotated logs
#         format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",  # Custom log format
#         level="DEBUG",  # Set log level to DEBUG
#     )
#
#
# logger = log


import logging
import sys
from loguru import logger as log


class InterceptHandler(logging.Handler):
    """
    Standard logging handler to intercept and redirect
    standard logging calls to Loguru.
    """

    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = log.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        log.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())


def setup_logger():
    # 1. Clear Loguru's default handler and standard logging handlers
    log.remove()
    logging.getLogger().handlers = [InterceptHandler()]

    # 2. Block/Silence noisy 3rd party loggers
    # We set them to WARNING to ignore the "INFO: Connected to DB" chatter
    logging.getLogger("uvicorn").handlers = []
    logging.getLogger("uvicorn.access").handlers = []
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("aiosqlite").setLevel(logging.WARNING)

    # 3. Add Loguru File Sink
    log.add(
        "app/logs/app.log",
        rotation="10 MB",
        retention="7 days",
        compression="zip",
        format="{time:YYYY-MM-DD HH:mm:ss} | <level>{level: <8}</level> | {message}",
        level="DEBUG",
        enqueue=True,  # 👈 Async-safe logging
    )

    # 4. Add Clean Console Sink (Optional: only if not in production)
    log.add(
        sys.stdout,
        format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{message}</cyan>",
        level="INFO",
        colorize=True,
    )

    # 5. Redirect all standard logging to Loguru
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)


# Export the configured instance
logger = log
