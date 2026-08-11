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

      const { orderId, customerId, totalAmount, customerName, items } = payload;
      
      if (!orderId || !customerId || totalAmount === undefined) {
        console.error('Missing required fields, dropping message.');
        return channel.nack(msg, false, false); // No requeue
      }

      try {
        let cakeNames = "your items";
        if (items && Array.isArray(items) && items.length > 0) {
          const names = items.map(item => item.name);
          if (names.length === 1) {
            cakeNames = names[0];
          } else if (names.length === 2) {
            cakeNames = `${names[0]} and ${names[1]}`;
          } else {
            const last = names.pop();
            cakeNames = `${names.join(', ')} and ${last}`;
          }
        }

        const namePrefix = customerName ? `Hi ${customerName},\n` : '';
        const message = `${namePrefix}Your order of : ${cakeNames} has been placed successfully.\nStay tuned we'll contact you once your order is ready to be delivered.\n\nYour Order ID: ${orderId}`;
        
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
