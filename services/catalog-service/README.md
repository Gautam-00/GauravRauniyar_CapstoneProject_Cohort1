# Cake Catalog Service

This service manages cake catalog data, metadata, pricing, and availability.

## How to Run and Manually Test This Phase

### 1. Prerequisites
- Node.js
- MongoDB

### 2. Start MongoDB
Ensure your local MongoDB instance is running. Depending on your environment, you might start it via:
```bash
net start MongoDB
# Or simply ensure the mongod process is active.
```

### 3. Navigate to the Service Directory
```bash
cd services/catalog-service
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Catalog Service
```bash
npm start
```

### 6. Verify Server Started Successfully
You should expect terminal output similar to:
```text
MongoDB Connected: localhost
Database empty. Seeding demo cakes...
Seeding complete.
Cake Catalog Service running on port 3001
```

---

## Manual Test Commands

Open a new terminal to run the following manual tests. (Note: On Windows PowerShell, use `curl.exe` instead of `curl`).

### 7. Get All Cakes
**Command:**
```bash
curl -s http://localhost:3001/cakes
```
**Expected Result:**
- HTTP 200
- Returns a JSON array containing all seeded demo cakes (5 items).

### 8. Get Cake by ID
*Note: Replace `<VALID_ID>` with an actual `_id` retrieved from the previous command.*
**Command:**
```bash
curl -s http://localhost:3001/cakes/<VALID_ID>
```
**Expected Result:**
- HTTP 200
- Returns a single cake JSON object matching the ID.

### 9. Filter by Name
**Command:**
```bash
curl -s "http://localhost:3001/cakes?name=truffle"
```
**Expected Result:**
- HTTP 200
- Returns an array containing the "Classic Chocolate Truffle" cake (case-insensitive search).

### 10. Filter by Category
**Command:**
```bash
curl -s "http://localhost:3001/cakes?category=Fruit"
```
**Expected Result:**
- HTTP 200
- Returns an array containing cakes in the Fruit category (e.g., Strawberry Shortcake, Seasonal Fruit Tart Cake).

### 11. Filter by minPrice / maxPrice Individually
**Command:**
```bash
curl -s "http://localhost:3001/cakes?minPrice=40"
```
**Expected Result:**
- HTTP 200
- Returns an array of cakes priced 40 or higher.

### 12. Combine Price Filters
**Command:**
```bash
curl -s "http://localhost:3001/cakes?minPrice=30&maxPrice=40"
```
**Expected Result:**
- HTTP 200
- Returns an array of cakes priced exactly between 30 and 40 (inclusive).

### 13. Test a Nonexistent Cake
**Command:**
```bash
curl -s http://localhost:3001/cakes/6a7979c5cfcee900e592f999
```
**Expected Result:**
- HTTP 404
- Returns `{"message": "Cake not found"}`.

### 14. Test an Invalid ObjectId
**Command:**
```bash
curl -s http://localhost:3001/cakes/invalid-id-format
```
**Expected Result:**
- HTTP 400
- Returns `{"message": "Invalid Cake ID format"}`.

### 15. Restart Catalog Service and Verify Seed Idempotency
1. Stop the Catalog Service process (`Ctrl+C` in the terminal).
2. Start it again:
   ```bash
   npm start
   ```
3. **Expected terminal output:**
   ```text
   MongoDB Connected: localhost
   Database already contains 5 cakes. Skipping seed to prevent duplicates.
   Cake Catalog Service running on port 3001
   ```
4. Verify by running:
   ```bash
   curl -s http://localhost:3001/cakes
   ```
   **Expected Result**: The number of cakes in the array remains exactly 5. No duplicates were inserted.
