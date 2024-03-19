FROM python:3.9-slim

WORKDIR /app

# COPY requirements.txt .

RUN pip install FastAPI

RUN pip install Uvicorn

COPY src .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "4"]

EXPOSE 8001
