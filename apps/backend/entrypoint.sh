#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running database migrations..."
# Run alembic migrations
alembic upgrade head

echo "Starting Gunicorn..."
# Start the application
exec gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
