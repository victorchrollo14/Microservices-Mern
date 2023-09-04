import { Products } from "./model.js";
import { getRabbitMQChannel } from "./productQueue.js";

const getData = async (req, res) => {
  const data = await Products.find();
  res.status(200).json(data);
};

const getCartData = async () => {
  const ch = await getRabbitMQChannel();
  ch.consume("product-service-queue", (message) => {
    const data = JSON.parse(message.content);
    console.log(data);
  });
};

getCartData();

export { getData };
