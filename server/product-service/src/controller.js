import { Products } from "./model.js";
import { getRabbitMQChannel } from "./productQueue.js";

const getData = async (req, res) => {
  const data = await Products.find();
  res.status(200).json(data);
};

const getCartData = async () => {
  try {
    const ch = await getRabbitMQChannel();
    let data = await new Promise((resolve) => {
      ch.consume("product-service-queue", (message) => {
        const parsedData = JSON.parse(message.content);
        resolve(parsedData);
        ch.ack(message);
      });
    });

    const cart = await data.cart;

    for (const product of cart) {
      const { productId } = product;

      const productDetails = await Products.findOne({ _id: productId });
      const { title, subtitle, price, images, category } = productDetails;

      product.title = title;
      product.subtitle = subtitle;
      product.price = price;
      product.images = images;
      product.category = category;
    }

    ch.sendToQueue("productDetails-queue", Buffer.from(JSON.stringify(cart)));
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

getCartData();

export { getData };
