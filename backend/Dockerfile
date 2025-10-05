# Backend Dockerfile для FastAPI приложения
FROM python:3.11-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Создание пользователя для запуска приложения (безопасность)
RUN useradd -m -u 1000 appuser

# Рабочая директория
WORKDIR /app

# Копирование requirements и установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Копирование кода приложения
COPY . .

# Изменение владельца файлов
RUN chown -R appuser:appuser /app

# Переключение на непривилегированного пользователя
USER appuser

# Открытие порта
EXPOSE 8000

# Healthcheck для мониторинга состояния
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/ || exit 1

# Запуск приложения через uvicorn
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
