var amqp = require('amqplib/callback_api');
let QUEUE_NAME = "hello";

amqp.connect('amqp://localhost', function(err, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(function(err1, channel) {
    if (err1) {
      throw err1;
    }

    channel.assertQueue(QUEUE_NAME, {
      durable: false
    });

    console.log(`[***] Waiting for messes in queue ${QUEUE_NAME} [***]`);
    channel.consume(QUEUE_NAME, function(message) {
        console.log(`[->] Received message: ${message.content.toString()}`);
      }, {
          noAck: true
        });

  });
});