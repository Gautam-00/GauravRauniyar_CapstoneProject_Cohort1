# Order Service

This service manages the anonymous customer's basket, checkout flow, and orders.

## How to Run and Manually Test This Phase

### 1. Prerequisites
- Node.js
- MongoDB

### 2. Start MongoDB
Ensure your local MongoDB instance is running. Depending on your environment, you might start it via:
```bash
net start MongoDB
```

### 3. Start Catalog Service
The Order Service requires the Catalog Service to fetch cake details.
```bash
cd ../catalog-service
npm start
```

### 4. Start Order Service
In a new terminal window:
```bash
cd services/order-service
npm install
npm start
```

You should see output similar to:
```text
MongoDB Connected: localhost
Order Service running on port 3002
```

---

## Manual Test Commands

Open a new terminal to run the following manual tests. (Note: On Windows PowerShell, use `curl.exe` instead of `curl`).

### 1. Get Empty Basket
**Command:**
```bash
curl -s -H "X-Customer-Id: user123" http://localhost:3002/basket
```
**Expected Result:**
- HTTP 200
- Returns `{"customerId":"user123","items":[]}`

### 2. Missing Header Test
**Command:**
```bash
curl -s http://localhost:3002/basket
```
**Expected Result:**
- HTTP 400
- Returns `{"message":"Missing X-Customer-Id header"}`

### 3. Add Item to Basket
*Replace `<VALID_CAKE_ID>` with an ID from the Catalog Service.*
**Command:**
```bash
curl -s -X POST -H "X-Customer-Id: user123" -H "Content-Type: application/json" -d "{\"cakeId\":\"<VALID_CAKE_ID>\", \"quantity\": 2}" http://localhost:3002/basket/items
```
**Expected Result:**
- HTTP 200
- Returns updated basket containing the new item.

### 4. Add Unavailable Cake
*Use the ID for "Seasonal Fruit Tart Cake" which is seeded as unavailable in Catalog.*
**Command:**
```bash
curl -s -X POST -H "X-Customer-Id: user123" -H "Content-Type: application/json" -d "{\"cakeId\":\"<FRUIT_TART_ID>\", \"quantity\": 1}" http://localhost:3002/basket/items
```
**Expected Result:**
- HTTP 400
- Returns `{"message":"Cake is currently unavailable"}`

### 5. Increment Existing Quantity
Run the exact same command as Test #3 again.
**Expected Result:**
- HTTP 200
- Returns basket with quantity updated to 4 (if added 2 originally).

### 6. Update Item Quantity
**Command:**
```bash
curl -s -X PUT -H "X-Customer-Id: user123" -H "Content-Type: application/json" -d "{\"quantity\": 10}" http://localhost:3002/basket/items/<VALID_CAKE_ID>
```
**Expected Result:**
- HTTP 200
- Returns basket with that item's quantity explicitly set to 10.

### 7. Remove Item from Basket
**Command:**
```bash
curl -s -X DELETE -H "X-Customer-Id: user123" http://localhost:3002/basket/items/<VALID_CAKE_ID>
```
**Expected Result:**
- HTTP 200
- Returns basket with the item removed from the array.

### 8. Invalid Quantity Edge Cases
**Command (Zero/Negative):**
```bash
curl -s -X POST -H "X-Customer-Id: user123" -H "Content-Type: application/json" -d "{\"cakeId\":\"<VALID_CAKE_ID>\", \"quantity\": 0}" http://localhost:3002/basket/items
```
**Expected Result:**
- HTTP 400
- Returns `{"message":"Quantity must be a positive integer"}`

**Command (Decimal):**
```bash
curl -s -X PUT -H "X-Customer-Id: user123" -H "Content-Type: application/json" -d "{\"quantity\": 1.5}" http://localhost:3002/basket/items/<VALID_CAKE_ID>
```
**Expected Result:**
- HTTP 400
- Returns `{"message":"Quantity must be a positive integer"}`

### 9. Update/Delete Nonexistent Item
**Command:**
```bash
curl -s -X DELETE -H "X-Customer-Id: user123" http://localhost:3002/basket/items/nonexistent-id
```
**Expected Result:**
- HTTP 404
- Returns `{"message":"Cake not found in basket"}`

### 10. Checkout & Consistency
Add an item to the basket (see #3), then run:
**Command:**
```bash
curl -s -X POST -H "X-Customer-Id: user123" http://localhost:3002/checkout
```
**Expected Result:**
- HTTP 201
- Returns the created Order object with `totalAmount` calculated and `status: "COMPLETED"`.
- Subsequent `GET /basket` should return empty.

### 11. Customer Isolation
**Command:**
```bash
curl -s -H "X-Customer-Id: other_user_999" http://localhost:3002/basket
```
**Expected Result:**
- HTTP 200
- Returns a fresh empty basket for the new customer.

### 12. Price Snapshot Verification
1. Note the price of a cake in Catalog.
2. Add the cake to your basket (Test #3).
3. **Manually change the price in the Catalog DB** (e.g. using MongoDB shell `db.cakes.updateOne(...)`).
4. Retrieve your basket (Test #1). The stored price should NOT have changed.
5. Checkout (Test #10). The `totalAmount` should be calculated using the original snapshot price stored in the basket, ignoring the new Catalog DB price.

### 13. Service Failure Handling
1. Stop the Catalog Service (`Ctrl+C`).
2. Attempt to add a cake to the basket (Test #3).
**Expected Result:**
- HTTP 503
- Returns `{"message":"Catalog Service is unavailable"}`
