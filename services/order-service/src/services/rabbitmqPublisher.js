const amqp = require('amqplib');

let channel = null;

const connectRabbitMQ = async () => {
  try {
    const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(rabbitMqUrl);
    channel = await connection.createChannel();
    
    await channel.assertExchange('cakedelight.events', 'direct', { durable: true });
    
    console.log('Order Service connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
  }
};

const publishOrderCompleted = async (eventPayload) => {
  if (!channel) {
    console.error('RabbitMQ channel not available, cannot publish order.completed event');
    return false;
  }
  
  try {
    const success = channel.publish(
      'cakedelight.events', 
      'order.completed', 
      Buffer.from(JSON.stringify(eventPayload)),
      { persistent: true }
    );
    
    if (success) {
      console.log('Successfully published ORDER_COMPLETED event:', eventPayload.eventId);
    } else {
      console.error('RabbitMQ publish buffer full, event dropped:', eventPayload.eventId);
    }
    return success;
  } catch (error) {
    console.error('Error publishing ORDER_COMPLETED event:', error.message);
    return false;
  }
};

module.exports = {
  connectRabbitMQ,
  publishOrderCompleted
};
