#!/bin/bash

# Скрипт остановки приложения

set -e

echo "🛑 Остановка MLPOps Review Service..."

docker compose down

echo "✅ Приложение остановлено!"
