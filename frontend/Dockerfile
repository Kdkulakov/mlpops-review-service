# Многоступенчатая сборка для оптимизации размера образа

# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

# Установка yarn глобально
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

WORKDIR /app

# Копирование файлов зависимостей
COPY package.json ./

# Установка зависимостей (без frozen-lockfile, так как yarn.lock отсутствует)
RUN yarn install --production=false

# Копирование всех файлов проекта
COPY . .

# Сборка продакшн версии
RUN yarn build

# Этап 2: Production образ с nginx
FROM nginx:alpine

# Копирование собранного приложения из builder
COPY --from=builder /app/build /usr/share/nginx/html

# Копирование конфигурации nginx для SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:8000; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
