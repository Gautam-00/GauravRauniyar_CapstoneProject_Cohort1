# Deployment Guide

This document details the processes for executing the Cake Delight application via Docker Compose and future orchestration platforms.

---

## 1. Docker Compose Deployment (Local Integration)

### Prerequisites
- **Docker Desktop** installed and running.
- Port `5173` (Frontend), `3000` (Gateway), and `15672` (RabbitMQ UI) available on the host machine.

### Commands

#### A. Build and Start Stack
To build image layers and launch all 8 containers in the background:
```bash
docker compose up --build -d
```

#### B. View Container Status & Logs
```bash
# Check status of running containers
docker compose ps

# View real-time logs for all services
docker compose logs -f

# View logs for a specific service
docker compose logs -f order-service
```

#### C. Stopping the Application (Preserving Data)
To stop container execution while retaining MongoDB persistent volume data (`mongo_data`):
```bash
docker compose stop
# or
docker compose down
```

#### D. Resetting Application Data (Clean Demo State)
To completely remove container stack along with the MongoDB volume (forces re-seeding of 30 cakes & ratings on next boot):
```bash
docker compose down -v
```

---

## 2. Application URLs & Credentials

- 🌐 **React Frontend**: `http://localhost:5173/`
- 🚪 **Express Gateway (Health Check)**: `http://localhost:3000/health`
- 🐰 **RabbitMQ Management Dashboard**: `http://localhost:15672/`
  - **Username**: `cakedelight`
  - **Password**: `cakedelight`

---

## 3. Architecture & Internal Network Configuration

- All 8 containers run inside the `cake-delight-network` Docker bridge network.
- **Client Browser** communicates strictly with host-published ports (`:5173` Frontend, `:3000` Gateway).
- **Backend Services** communicate internally via Docker DNS hostnames (`http://catalog-service:3001`, `mongodb://mongodb:27017`, `amqp://cakedelight:cakedelight@rabbitmq:5672`).

---

## TODO (Future Phases)
- [x] Document Docker Compose orchestration and running instructions
- [ ] Document Minikube cluster setup & Kubernetes manifests
- [ ] Document Docker Hub image pushing
- [ ] Document GitHub Actions CI/CD pipelines
