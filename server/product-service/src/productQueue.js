import amqp from "amqplib";

let channel, connection;

const connectToRabbitMQ = async () => {
  try {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("product-service-queue");

    return channel;
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export const getRabbitMQChannel = async () => {
  if (!channel) {
    channel = await connectToRabbitMQ();
  }

  return channel;
};
