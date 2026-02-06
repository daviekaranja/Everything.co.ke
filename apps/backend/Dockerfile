# FROM python:3.12-slim

# LABEL authors="Davie Karanja"

# WORKDIR /app

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Install system dependencies
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     curl \
#     && rm -rf /var/lib/apt/lists/*

# # --- MONOREPO PATHS START HERE ---

# # 1. Copy requirements using the path from the root context
# COPY apps/backend/requirements.txt .

# # 2. Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# # 3. Copy the backend source code
# # Note: This only copies the backend folder's contents into /app
# COPY apps/backend/ .

# # Give execution rights to the entrypoint script
# RUN chmod +x entrypoint.sh

# # 4. (Optional) If you have a shared package you need:
# # COPY packages/shared-auth ./shared-auth

# # --- MONOREPO PATHS END HERE ---

# EXPOSE 8000

# # Ensure the path to 'main:app' is correct inside the /app folder
# #CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]
# #CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--chdir", "/app", "app.main:app", "--bind", "0.0.0.0:8000"]

# # Use the script as the entrypoint
# ENTRYPOINT ["./entrypoint.sh"]



FROM python:3.12-slim

LABEL authors="Davie Karanja"

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 1. Copy requirements from the monorepo context
COPY apps/backend/requirements.txt .

# 2. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# 3. Copy backend source code PRESERVING the folder structure
# We copy the content into a folder named 'app' or keep the 'apps/backend' structure
# To fix your specific import 'from app.lib...', the code MUST be in a folder named 'app'
# Copy the backend source code while preserving the 'app' package identity
COPY apps/backend/app ./app
COPY apps/backend/alembic ./alembic
COPY apps/backend/alembic.ini .
COPY apps/backend/main.py .
COPY apps/backend/entrypoint.sh .

# Crucial: Ensure the 'app' directory is in the python path
ENV PYTHONPATH=/app

RUN chmod +x entrypoint.sh


EXPOSE 8000

# Set PYTHONPATH so the 'app' module is discoverable from the root
ENTRYPOINT ["./entrypoint.sh"]
