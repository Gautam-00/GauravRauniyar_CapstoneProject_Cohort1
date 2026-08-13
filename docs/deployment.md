# Deployment Guide

This document details the processes for deploying and executing the **Cake Delight** application via **Docker Compose**, **Docker Hub Registry**, **Docker Desktop Kubernetes**, and **Minikube**.

---

## 1. Docker Desktop Kubernetes Deployment (Zero Minikube Required)

### Prerequisites
1. **Docker Desktop** installed and running on Windows.
2. **kubectl** installed (`winget install -e --id Kubernetes.kubectl`).

### Steps from Clone to Running Site

#### Step 1: Clone Repository
```bash
git clone https://github.com/Gautam-00/GauravRauniyar_CapstoneProject_Cohort1.git
cd GauravRauniyar_CapstoneProject_Cohort1
```

#### Step 2: Enable Built-in Kubernetes in Docker Desktop
1. Open **Docker Desktop**.
2. Click **Settings ⚙️** (top right) ➔ **Kubernetes** (left sidebar).
3. Check **"Enable Kubernetes"** ➔ Click **"Apply & restart"**.
4. Wait 1–2 minutes until Docker Desktop bottom bar indicates `Kubernetes running`.

#### Step 3: Deploy All Kubernetes Manifests
```bash
# Create namespace and deploy all 8 microservice workloads
kubectl apply -f k8s/ --recursive
```
*(If run on a brand new cluster for the first time, execute the command a 2nd time so namespace registration completes).*

#### Step 4: Verify All 8 Pods
```bash
# Check Pod status (wait ~30-45s for images to pull from Docker Hub)
kubectl get pods -n cake-delight
```

#### Step 5: Port-Forward & Access Site
```powershell
# Run port-forwarding for Frontend (5173) and Gateway (3000)
Start-Job { kubectl port-forward svc/frontend 5173:80 -n cake-delight } ; Start-Job { kubectl port-forward svc/gateway 3000:3000 -n cake-delight }
```

Open **`http://localhost:5173`** in your browser!

---

## 2. Minikube Deployment (Alternative Local Kubernetes)

### Prerequisites
1. **Docker Desktop** running (provides container engine driver).
2. **Minikube** installed (`winget install -e --id Kubernetes.minikube`).
3. **kubectl** installed (`winget install -e --id Kubernetes.kubectl`).

### Execution Commands
```bash
# Start Minikube cluster
minikube start --driver=docker

# Apply manifests
kubectl apply -f k8s/ --recursive

# Check Pod readiness
kubectl get pods -n cake-delight

# Port forward
kubectl port-forward svc/frontend 5173:80 -n cake-delight
kubectl port-forward svc/gateway 3000:3000 -n cake-delight
```

Open **`http://localhost:5173`** in your browser!

---

## 3. Docker Compose Deployment (Local Integration from Source)

```bash
# Build images and start all 8 containers in background
docker compose up --build -d

# View status & logs
docker compose ps
docker compose logs -f

# Stop containers while preserving data
docker compose stop
```

---

## 4. Docker Hub Image Registry

Six prebuilt custom application images are published publicly on Docker Hub under user `nemo0110`:

- `nemo0110/cake-delight-frontend:v1.0.0`
- `nemo0110/cake-delight-gateway:v1.0.0`
- `nemo0110/cake-delight-catalog-service:v1.0.0`
- `nemo0110/cake-delight-order-service:v1.0.0`
- `nemo0110/cake-delight-rating-service:v1.0.0`
- `nemo0110/cake-delight-notification-service:v1.0.0`

---

## 5. Application URLs & Credentials Summary

- 🌐 **React Frontend**: `http://localhost:5173/`
- 🚪 **Express Gateway (Health Check)**: `http://localhost:3000/health`
- 🐰 **RabbitMQ Credentials**: Username `cakedelight` / Password `cakedelight`
