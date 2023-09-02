import amqp from "amqplib";
import { createCart } from "./controller.js";

let channel, connection;

const connectToRabbitMQ = async () => {
  const amqpServer = "amqp://guest:guest@localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("cart-service-queue");
};

connectToRabbitMQ().then(() => {
  channel.consume("cart-service-queue", (data) => {
    console.log("consumed data from user-service-queue");
    const user = JSON.parse(data.content);
    createCart(user);
    channel.ack(data);
  });
});

export { connectToRabbitMQ, channel };
