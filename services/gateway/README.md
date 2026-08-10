# Express Gateway

The single HTTP entry point for the Cake Delight frontend.

## Prerequisites
- Node.js (v18+)

## Local Setup
1. Open terminal in `services/gateway/`
2. Run `npm install`
3. Ensure `.env` is created based on `.env.example`.
4. Run `npm start`

Service runs on port `3000`.

## Routing Table
- `GET /api/catalog/*` -> Cake Catalog Service (Port 3001)
- `GET/POST/PUT/DELETE /api/orders/*` -> Order Service (Port 3002)
- `GET/POST/PUT/DELETE /api/ratings/*` -> Rating Service (Port 3003)
- `GET /api/notifications/*` -> Notification Service (Port 3004)
- `GET /health` -> Gateway Health Check
