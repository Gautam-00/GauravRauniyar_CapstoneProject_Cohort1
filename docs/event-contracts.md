# Event Contracts

This project uses RabbitMQ for asynchronous communication to decouple the checkout process from the notification delivery.

## Event: `ORDER_COMPLETED`

- **Publisher**: Order Service (published immediately upon successful checkout)
- **Consumer**: Notification Service (listens continuously)
- **Exchange**: `cakedelight.events` (Topic or Fanout exchange)
- **Routing Key**: `order.completed`

### Payload Structure
The event contains the minimum necessary data for the Notification service to formulate a meaningful in-app message.

```json
{
  "eventId": "uuid-string",
  "orderId": "60d5ecb8b392cb2...",
  "customerId": "uuid-from-frontend",
  "totalAmount": 45.50,
  "timestamp": "2026-08-10T10:00:00.000Z"
}
```

### Consumer Behaviour
Upon receiving the `ORDER_COMPLETED` event, the Notification Service will:
1. Parse the payload.
2. Generate an in-app message string, e.g., `"Your order #60d5ecb... for $45.50 has been confirmed!"`
3. Save the record into `notification_db.notifications`.
4. Acknowledge (ACK) the message to RabbitMQ.
