#!/bin/bash

# Скрипт запуска приложения в Docker

set -e

echo "🚀 Запуск MLPOps Review Service..."

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo "⚠️  Файл .env не найден. Копирую из .env.example..."
    cp .env.example .env
    echo "⚠️  ВНИМАНИЕ: Обязательно отредактируйте .env файл перед использованием в продакшене!"
fi

# Сборка и запуск контейнеров
echo "🔨 Сборка Docker образов..."
docker compose build

echo "🚀 Запуск контейнеров..."
docker compose up -d

echo "⏳ Ожидание запуска сервисов..."
sleep 10

# Проверка статуса
echo "📊 Статус контейнеров:"
docker compose ps

echo ""
echo "✅ Приложение запущено!"
echo ""
echo "📍 Доступные сервисы:"
echo "   Frontend:  http://localhost"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo "   MongoDB:   mongodb://localhost:27017"
echo ""
echo "📝 Логи: docker compose logs -f"
echo "🛑 Остановка: ./devops/scripts/stop.sh"
