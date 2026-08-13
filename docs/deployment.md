# Deployment Guide

This document details the processes for deploying and executing the **Cake Delight** application via **Docker Compose**, **Docker Hub Registry**, and **Kubernetes (Minikube)**.

---

## 1. Docker Compose Deployment (Local Integration)

### Prerequisites
- **Docker Desktop** installed and running.
- Ports `5173` (Frontend), `3000` (Gateway), and `15672` (RabbitMQ UI) available on host.

### Commands
```bash
# Build images and start all 8 containers in background
docker compose up --build -d

# View container status and logs
docker compose ps
docker compose logs -f

# Stop containers while preserving data
docker compose stop

# Reset stack & delete database volume (forces re-seeding)
docker compose down -v
```

---

## 2. Docker Hub Image Registry

Six prebuilt custom application images are published publicly on Docker Hub under user `nemo0110`:

- `nemo0110/cake-delight-frontend:v1.0.0`
- `nemo0110/cake-delight-gateway:v1.0.0`
- `nemo0110/cake-delight-catalog-service:v1.0.0`
- `nemo0110/cake-delight-order-service:v1.0.0`
- `nemo0110/cake-delight-rating-service:v1.0.0`
- `nemo0110/cake-delight-notification-service:v1.0.0`

---

## 3. Kubernetes Deployment (Minikube / Cluster)

### Architecture
- **Namespace**: `cake-delight`
- **Workloads**: 8 Deployments (1 replica each) & 8 ClusterIP Services.
- **Config & Secrets**: `cake-delight-config` (ConfigMap) & `cake-delight-secret` (Secret).
- **Images**: Pulled directly from Docker Hub (`nemo0110/cake-delight-*:v1.0.0`).

### Execution Commands

#### A. Apply Namespace, Config, Secrets, & Workloads
```bash
# Create namespace and apply all manifests recursively
kubectl apply -f k8s/ --recursive
```

#### B. Verify Cluster Status & Workloads
```bash
# Verify namespace resources
kubectl get all -n cake-delight

# Check Pod readiness and health
kubectl get pods -n cake-delight
```

#### C. Local Browser Access (Port Forwarding)
To access the frontend and gateway from your local browser:
```bash
# Port-forward Frontend
kubectl port-forward svc/frontend 5173:80 -n cake-delight

# Port-forward Gateway
kubectl port-forward svc/gateway 3000:3000 -n cake-delight
```

- 🌐 **Frontend URL**: `http://localhost:5173`
- 🚪 **Gateway /health**: `http://localhost:3000/health`

#### D. Demonstrating Kubernetes Self-Healing
To demonstrate automatic Pod recreation by the Deployment controller:
```bash
# Delete a stateless Pod
kubectl delete pod -l app=catalog-service -n cake-delight

# Verify Kubernetes immediately recreates a new healthy Pod
kubectl get pods -n cake-delight
```

#### E. MongoDB Ephemeral Storage Limitation
- **Storage**: Initial MVP uses `emptyDir` ephemeral storage.
- **Behavior**: If the MongoDB Pod is deleted or recreated, previous database records reset. `catalog-service` and `rating-service` seeders automatically recreate 30 cakes & 30 initial ratings on fresh boot.

#### F. Teardown / Cleanup
```bash
# Remove all Kubernetes resources and namespace
kubectl delete namespace cake-delight
```

---

## 4. Application URLs & Credentials Summary

- 🌐 **React Frontend**: `http://localhost:5173/`
- 🚪 **Express Gateway (Health Check)**: `http://localhost:3000/health`
- 🐰 **RabbitMQ Credentials**: Username `cakedelight` / Password `cakedelight`

---

## Roadmap Status
- [x] Document Docker Compose orchestration and running instructions
- [x] Document Docker Hub image tagging and registry structure
- [x] Document Kubernetes (Minikube) manifests, port-forwarding, & self-healing
- [ ] Document GitHub Actions CI/CD pipelines
