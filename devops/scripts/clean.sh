#!/bin/bash

# Скрипт полной очистки (включая volumes)

set -e

echo "🧹 Полная очистка MLPOps Review Service..."
echo "⚠️  ВНИМАНИЕ: Это удалит ВСЕ данные, включая базу данных!"
echo ""
read -p "Вы уверены? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Отменено"
    exit 1
fi

echo "🛑 Остановка контейнеров..."
docker compose down -v

echo "🗑️  Удаление образов..."
docker compose down --rmi all

echo "✅ Очистка завершена!"
