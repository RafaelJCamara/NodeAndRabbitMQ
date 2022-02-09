let amqp = require('amqplib/callback_api');
let QUEUE_NAME = "hello";
let message = "Hello World-";

//connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, connection) {
  if (err) {
    throw err;
  }
  //create a channel
  connection.createChannel(function(err1, channel) {
    if (err1) {
      throw err1;
    }
    //declare queue
    //the queue will only be created if it doesn't already exist (meaning it's idempotent)
    channel.assertQueue(QUEUE_NAME, {
      durable: false
    });

    //send to queue
    for(let i=1;i<11;i++){
      let sent_message = `${message}${i}`;
      channel.sendToQueue(QUEUE_NAME, Buffer.from(sent_message));
      console.log(`[->] ${sent_message} sent to queue ${QUEUE_NAME}`);
    }

  });
  //close connection and exit
  setTimeout(function() {
    connection.close();
    process.exit(0)
    }, 500);
});

