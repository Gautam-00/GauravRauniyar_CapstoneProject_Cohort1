# Rating Service

The Rating Service is a standalone Node.js microservice responsible for handling cake ratings and calculating aggregate averages.

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally on port 27017

## Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   A `.env` file is required. Use `.env.example` as a template:
   ```env
   PORT=3003
   MONGO_URI=mongodb://localhost:27017/rating_db
   ```

3. **Start the service:**
   ```bash
   npm start
   ```

## Manual Testing (curl)

Once the service is running, you can manually test it using `curl` commands.

### 1. Submit Valid Rating (5)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 5}" http://localhost:3003/ratings
```

### 2. Get Average (Expect 5 / 1)
```bash
curl http://localhost:3003/ratings/average/test_cake_1
```

### 3. Submit Second Rating (4) for Same Cake
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 4, \"comment\": \"Good\"}" http://localhost:3003/ratings
```

### 4. Get Average (Expect 4.5 / 2)
```bash
curl http://localhost:3003/ratings/average/test_cake_1
```

### 5. Submit Third Rating (2)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 2}" http://localhost:3003/ratings
```

### 6. No Ratings (Expect 0 / 0)
```bash
curl http://localhost:3003/ratings/average/new_empty_cake
```

### 7. Invalid Rating (Too High: 6)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 6}" http://localhost:3003/ratings
```

### 8. Invalid Rating (Zero)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 0}" http://localhost:3003/ratings
```

### 9. Invalid Rating (Negative)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": -1}" http://localhost:3003/ratings
```

### 10. Invalid Rating (Decimal)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\", \"rating\": 4.5}" http://localhost:3003/ratings
```

### 11. Missing cakeId
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"rating\": 5}" http://localhost:3003/ratings
```

### 12. Missing rating
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"cakeId\":\"test_cake_1\"}" http://localhost:3003/ratings
```
