const Notification = require('../models/Notification');

const startConsumer = async (channel, queue) => {
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      let payload;
      try {
        payload = JSON.parse(msg.content.toString());
      } catch (err) {
        console.error('Invalid JSON payload, dropping message.');
        return channel.nack(msg, false, false); // No requeue
      }

      const { orderId, customerId, totalAmount } = payload;
      
      if (!orderId || !customerId || totalAmount === undefined) {
        console.error('Missing required fields, dropping message.');
        return channel.nack(msg, false, false); // No requeue
      }

      try {
        const message = `Your order ${orderId} has been completed successfully.`;
        
        const notification = new Notification({
          customerId,
          orderId,
          message
        });

        await notification.save();
        console.log(`Notification saved for order ${orderId}`);
        
        channel.ack(msg);
      } catch (dbError) {
        console.error('MongoDB save failed, requeueing message:', dbError.message);
        // Nack with requeue=true so message is not lost
        channel.nack(msg, false, true);
      }
    }
  });
};

module.exports = {
  startConsumer
};
