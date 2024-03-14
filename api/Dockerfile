FROM python:3.9-slim

WORKDIR /app

# COPY requirements.txt .

RUN pip install FastAPI

RUN pip install Uvicorn

COPY src .

EXPOSE 8001
