#!/bin/bash

# Скрипт просмотра логов

SERVICE=${1:-}

if [ -z "$SERVICE" ]; then
    echo "📝 Просмотр всех логов..."
    docker compose logs -f
else
    echo "📝 Просмотр логов сервиса: $SERVICE"
    docker compose logs -f "$SERVICE"
fi
