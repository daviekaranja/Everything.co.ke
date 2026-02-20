# FROM python:3.12-slim

# LABEL authors="Davie Karanja"

# WORKDIR /app

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# RUN apt-get update && apt-get install -y --no-install-recommends \
#     curl \
#     && rm -rf /var/lib/apt/lists/*

# # 1. Copy requirements from the monorepo context
# COPY apps/backend/requirements.txt .

# # 2. Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# COPY apps/backend/app ./app
# COPY apps/backend/alembic ./alembic
# COPY apps/backend/alembic.ini .
# COPY apps/backend/entrypoint.sh .

# # Crucial: Ensure the 'app' directory is in the python path
# ENV PYTHONPATH=/app

# RUN chmod +x entrypoint.sh


# EXPOSE 8000

# # Set PYTHONPATH so the 'app' module is discoverable from the root
# ENTRYPOINT ["./entrypoint.sh"]



FROM python:3.12-slim

LABEL authors="Davie Karanja"

# Set the working directory to the root of your project inside the container
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 1. Copy requirements first for caching
COPY apps/backend/requirements.txt ./apps/backend/

# 2. Install dependencies
RUN pip install --no-cache-dir -r apps/backend/requirements.txt && pip install gunicorn

# 3. Replicate the EXACT structure from the image
# We copy the local folder into the matching path in the container
COPY apps/backend/app ./apps/backend/app
COPY apps/backend/alembic ./apps/backend/alembic
COPY apps/backend/alembic.ini ./apps/backend/alembic.ini
COPY apps/backend/entrypoint.sh ./apps/backend/entrypoint.sh

# 4. Set WORKDIR to the backend folder so entrypoint.sh runs from there
WORKDIR /app/apps/backend

# Ensure the root of the backend is in PYTHONPATH so 'app' is found
ENV PYTHONPATH=/app/apps/backend

RUN chmod +x entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
