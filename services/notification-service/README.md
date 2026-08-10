# Notification Service

Microservice responsible for listening to RabbitMQ checkout events and storing in-app notifications for users.

## Prerequisites
- Node.js (v18+)
- Local MongoDB running on `localhost:27017`
- Local RabbitMQ running on `localhost:5672`

## Local Setup
1. Open terminal in `services/notification-service/`
2. Run `npm install`
3. Make sure `.env` is created based on `.env.example`.
4. Run `npm start`

Service runs on port `3004`.

## API endpoints

- `GET /notifications` (Requires `X-Customer-Id` header)
