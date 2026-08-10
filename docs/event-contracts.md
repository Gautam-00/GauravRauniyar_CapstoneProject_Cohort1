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
1. Parse the payload. (If parsing fails or fields are missing, it drops the message without requeue).
2. Generate an in-app message string, e.g., `"Your order #60d5ecb... for $45.50 has been completed successfully."`
3. Save the record into `notification_db.notifications`. (If this fails, it rejects the message *with requeue* so RabbitMQ can try again).
4. Acknowledge (ACK) the message to RabbitMQ.

### MVP Consistency Limitations
1. **Publisher Failure**: If RabbitMQ is unavailable during checkout, the Order Service logs the error but still returns `201 Created` because the core order was placed and basket cleared. The `ORDER_COMPLETED` event is permanently lost, meaning no notification will be delivered. This prioritizes core functionality over strict consistency.
2. **Idempotency/Duplicate Delivery**: The `notification_db` schema does not store `eventId`. If RabbitMQ delivers the exact same message twice, the Notification Service will process both, resulting in duplicate notifications. MVP accepts this risk.
