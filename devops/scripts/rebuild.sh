#!/bin/bash

# Скрипт пересборки приложения

set -e

echo "🔄 Пересборка MLPOps Review Service..."

# Остановка контейнеров
echo "🛑 Остановка контейнеров..."
docker compose down

# Удаление старых образов
echo "🗑️  Удаление старых образов..."
docker compose build --no-cache

# Запуск обновленных контейнеров
echo "🚀 Запуск обновленных контейнеров..."
docker compose up -d

echo "⏳ Ожидание запуска сервисов..."
sleep 10

# Проверка статуса
echo "📊 Статус контейнеров:"
docker compose ps

echo "✅ Пересборка завершена!"
