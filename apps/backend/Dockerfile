# # Use the specific Python 3.12 slim image for a smaller footprint
# FROM python:3.12-slim

# LABEL authors="Davie Karanja"

# # Set the working directory inside the container
# WORKDIR /app

# # Set environment variables
# # PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files
# # PYTHONUNBUFFERED: Ensures logs are sent straight to terminal without buffering
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Install system dependencies if needed (e.g., curl for healthchecks)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     curl \
#     && rm -rf /var/lib/apt/lists/*

# # Copy requirements first to leverage Docker cache
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# # Copy the rest of the application code
# COPY . .

# # Expose the port FastAPI will run on
# EXPOSE 8000

# # Run Gunicorn with the Uvicorn worker class
# # Replace 'main:app' with 'your_filename:your_fastapi_instance_name'
# CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]


# Use the specific Python 3.12 slim image for a smaller footprint

FROM python:3.12-slim

LABEL authors="Davie Karanja"

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# --- MONOREPO PATHS START HERE ---

# 1. Copy requirements using the path from the root context
COPY apps/backend/requirements.txt .

# 2. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# 3. Copy the backend source code
# Note: This only copies the backend folder's contents into /app
COPY apps/backend/ .

# 4. (Optional) If you have a shared package you need:
# COPY packages/shared-auth ./shared-auth

# --- MONOREPO PATHS END HERE ---

EXPOSE 8000

# Ensure the path to 'main:app' is correct inside the /app folder
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]
