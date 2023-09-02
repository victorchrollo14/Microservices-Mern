import amqp from "amqplib";

let connection, channel;

const connectToRabbitMQ = async () => {
  const amqpServer = "amqp://guest:guest@localhost:5672";
  connection = await amqp.connect(amqpServer);
  console.log("connected to rabbitmq server");

  channel = await connection.createChannel();
  await channel.assertQueue("user-service-queue");
};

export { connectToRabbitMQ, channel };
