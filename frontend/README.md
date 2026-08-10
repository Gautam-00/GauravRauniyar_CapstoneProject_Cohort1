# Cake Delight Frontend

This is the React frontend for the Cake Delight microservices application.

## Purpose
Provides the user interface for browsing cakes, managing a basket, submitting ratings, completing orders, and viewing notifications.

## Technology Stack
- **Framework**: React (v18+)
- **Routing**: React Router DOM (v6+)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables)

## Setup and Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Ensure you have a `.env` file at the root of `frontend/` (copied from `.env.example`).
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Architecture
The frontend strictly communicates **only** with the Express API Gateway (`http://localhost:3000`). It does not communicate directly with the individual microservices. 

## Anonymous Customer ID
The application does not have authentication. Instead, it generates a persistent UUID for each browser client, stored in `localStorage` as `cake_delight_customer_id`. This ID is selectively passed in the `X-Customer-Id` header for Order and Notification service API calls to associate data with the anonymous user.

## Image Strategy
Cake images are stored locally in the `public/images/` directory. The catalog database provides relative paths (e.g., `/images/chocolate-truffle.jpg`) which match the static assets served by Vite.

## Folder Structure
- `public/images/`: Static image assets
- `src/api/`: Gateway API client wrapper and domain-specific API calls
- `src/components/`: Reusable presentational React components
- `src/pages/`: Route-level container components
- `src/utils/`: Shared utilities (e.g., Customer ID generation)
