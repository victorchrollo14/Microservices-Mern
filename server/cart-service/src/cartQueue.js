import amqp from "amqplib";
import { createCart } from "./controller.js";

let channel, connection;

const connectToRabbitMQ = async () => {
  try {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("cart-service-queue");
    await channel.assertQueue("productDetails-queue");

    return channel;
  } catch (err) {
    console.log(`error: ${err}`);
    throw err;
  }
};

export const getRabbitMQChannel = async () => {
  if (!channel) {
    channel = await connectToRabbitMQ();
  }

  return channel;
};

connectToRabbitMQ()
  .then(() => {
    channel.consume("cart-service-queue", (data) => {
      console.log("consumed data from user-service-queue");
      const user = JSON.parse(data.content);
      createCart(user);
      channel.ack(data);
    });
  })
  .catch((err) => console.log(`error: ${err}`));
