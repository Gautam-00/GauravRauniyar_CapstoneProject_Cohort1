const amqp = require('amqplib');
const { startConsumer } = require('../consumers/orderCompletedConsumer');

let channel = null;

const connectRabbitMQ = async () => {
  try {
    const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(rabbitMqUrl);
    channel = await connection.createChannel();
    
    const exchange = 'cakedelight.events';
    const queue = 'notification_service_queue';
    const routingKey = 'order.completed';

    // Assert exchange (direct)
    await channel.assertExchange(exchange, 'direct', { durable: true });
    
    // Assert queue
    await channel.assertQueue(queue, { durable: true });
    
    // Bind queue to exchange with routing key
    await channel.bindQueue(queue, exchange, routingKey);

    // Consume messages (one at a time)
    await channel.prefetch(1);

    console.log('Notification Service connected to RabbitMQ and consuming queue:', queue);

    await startConsumer(channel, queue);
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    process.exit(1);
  }
};

module.exports = {
  connectRabbitMQ
};
