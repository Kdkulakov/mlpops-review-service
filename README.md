# MLOps Review Service

Сервис для оценки готовности компании к внедрению MLOps практик. Приложение включает в себя интерактивный опросник из 60 вопросов, систему подсчета зрелости и детальные рекомендации по улучшению.

## 🎯 Описание

MLOps Review Service - это веб-приложение для комплексной оценки уровня зрелости MLOps практик в организации. Сервис анализирует 5 ключевых областей:

1. **Управление данными** - практики работы с данными, версионирование, качество
2. **Разработка моделей** - процессы обучения, эксперименты, версионирование моделей
3. **Развертывание и мониторинг** - CI/CD для ML, мониторинг моделей в продакшене
4. **Инфраструктура и автоматизация** - MLOps платформы, оркестрация, масштабирование
5. **Управление и процессы** - команда, документация, governance

## 🏗️ Архитектура

Проект построен на микросервисной архитектуре с использованием Docker:

- **Frontend**: React + Tailwind CSS + shadcn/ui компоненты
- **Backend**: FastAPI (Python) + Motor (async MongoDB driver)
- **Database**: MongoDB 7.0
- **Deployment**: Docker Compose

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend  │─────>│   Backend    │─────>│   MongoDB    │
│   (React)   │ HTTP │  (FastAPI)   │      │              │
│   Port 80   │<─────│  Port 8000   │      │  Port 27017  │
└─────────────┘      └──────────────┘      └──────────────┘
```

## 📋 Требования

- Docker 20.10+
- Docker Compose 2.0+

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/Kdkulakov/mlpops-review-service.git
cd mlpops-review-service
```

### 2. Настройка переменных окружения (опционально)

Создайте файл `.env` в корне проекта для кастомизации настроек:

```env
# MongoDB настройки
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password
DB_NAME=mlpops_db

# Backend настройки
CORS_ORIGINS=http://localhost:3000,http://localhost
```

### 3. Запуск приложения

```bash
docker compose up -d
```

Приложение будет доступно по адресу: **http://localhost**

### 4. Остановка приложения

```bash
docker compose down
```

Для полной очистки включая volumes:

```bash
docker compose down -v
```

## 🔧 Разработка

### Структура проекта

```
mlpops-review-service/
├── frontend/                 # React приложение
│   ├── src/
│   │   ├── components/      # UI компоненты (shadcn/ui)
│   │   ├── pages/           # Страницы приложения
│   │   ├── data/            # Данные опросника
│   │   └── App.js           # Главный компонент
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # FastAPI сервис
│   ├── server.py            # Основной файл приложения
│   ├── requirements.txt     # Python зависимости
│   └── Dockerfile
│
├── tests/                    # Тесты (запускаются в Docker)
│
├── docker-compose.yml        # Конфигурация сервисов
├── .gitignore
└── README.md
```

### Локальная разработка Frontend

```bash
cd frontend
yarn install
yarn start
```

Frontend будет доступен на **http://localhost:3000**

### Локальная разработка Backend

⚠️ **Важно**: Python скрипты запускаются только через виртуальное окружение внутри Docker

```bash
# Войти в контейнер backend
docker compose exec backend bash

# Внутри контейнера создать виртуальное окружение
python -m venv venv
source venv/bin/activate

# Установить зависимости
pip install -r requirements.txt

# Запустить сервер для разработки
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### Запуск тестов

Все тесты запускаются внутри Docker контейнера:

```bash
# Войти в контейнер backend
docker compose exec backend bash

# Запустить тесты
pytest tests/
```

## 📊 API Endpoints

### GET /api/
Проверка работоспособности API

**Response:**
```json
{
  "message": "Hello World"
}
```

### POST /api/status
Создание записи о проверке статуса

**Request:**
```json
{
  "client_name": "Company Name"
}
```

**Response:**
```json
{
  "id": "uuid",
  "client_name": "Company Name",
  "timestamp": "2025-10-05T12:00:00"
}
```

### GET /api/status
Получение всех записей статусов

**Response:**
```json
[
  {
    "id": "uuid",
    "client_name": "Company Name",
    "timestamp": "2025-10-05T12:00:00"
  }
]
```

## 🎨 Использование приложения

### Прохождение опроса

1. Откройте приложение в браузере: **http://localhost**
2. Ознакомьтесь с 60 вопросами, разбитыми на 5 блоков
3. Для каждого вопроса выберите один из вариантов:
   - **Да (2 балла)** - практика полностью внедрена
   - **Частично (1 балл)** - практика частично внедрена
   - **Нет (0 баллов)** - практика отсутствует
4. Переходите между блоками с помощью навигации
5. После ответа на все 60 вопросов нажмите **"Показать результаты"**

### Интерпретация результатов

Система оценивает уровень зрелости MLOps по 4 категориям:

| Уровень | Баллы | Описание |
|---------|-------|----------|
| 🌱 **Начальный** | 0-30 | MLOps практики отсутствуют или минимальны |
| 📈 **Развивающийся** | 31-60 | Базовые практики внедрены, требуется развитие |
| 🎯 **Зрелый** | 61-90 | Большинство практик внедрены и работают |
| 🚀 **Оптимизированный** | 91-120 | Полный набор MLOps практик с автоматизацией |

### Результаты включают:

- Общий уровень зрелости MLOps
- Детальная разбивка по каждому из 5 блоков
- Визуализация сильных и слабых сторон
- Конкретные рекомендации по улучшению

## 🐳 Docker команды

### Просмотр логов

```bash
# Все сервисы
docker compose logs -f

# Конкретный сервис
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

### Перезапуск сервиса

```bash
docker compose restart backend
docker compose restart frontend
```

### Пересборка после изменений

```bash
# Пересборка всех сервисов
docker compose up -d --build

# Пересборка конкретного сервиса
docker compose up -d --build backend
```

### Проверка состояния

```bash
docker compose ps
```

## 🔒 Безопасность

- MongoDB запускается с authentication (credentials в `.env`)
- Backend использует CORS для контроля доступа
- Все сервисы изолированы в Docker network
- База данных не доступна извне (только через backend)

## 📝 Переменные окружения

| Переменная | Описание | Значение по умолчанию |
|-----------|----------|----------------------|
| `MONGO_ROOT_USERNAME` | MongoDB admin username | `admin` |
| `MONGO_ROOT_PASSWORD` | MongoDB admin password | `changeme` |
| `DB_NAME` | Название базы данных | `mlpops_db` |
| `CORS_ORIGINS` | Разрешенные origins для CORS | `http://localhost:3000,http://localhost` |

## 🤝 Contributing

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT.

## 👤 Автор

**Kdkulakov**
- GitHub: [@Kdkulakov](https://github.com/Kdkulakov)

## 🙏 Благодарности

- [FastAPI](https://fastapi.tiangolo.com/) - современный веб-фреймворк для Python
- [React](https://react.dev/) - библиотека для построения пользовательских интерфейсов
- [shadcn/ui](https://ui.shadcn.com/) - коллекция переиспользуемых компонентов
- [MongoDB](https://www.mongodb.com/) - NoSQL база данных
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS фреймворк
