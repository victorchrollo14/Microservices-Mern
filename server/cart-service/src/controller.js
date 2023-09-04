import { getRabbitMQChannel } from "./cartQueue.js";
import Cart from "./model.js";

const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.findOne({ userId: userId });
    const ch = await getRabbitMQChannel();

    ch.sendToQueue(
      "product-service-queue",
      Buffer.from(JSON.stringify({ cart: userCart.items }))
    );
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};

const createCart = async (user) => {
  try {
    const { _id } = user.newUser;
    const cart = new Cart({
      userId: _id,
      items: [],
    });

    await cart.save();
    console.log("cart created");
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const addItem = async (req, res) => {
  try {
    const userId = req.body._id;
    const productId = req.params.productId;
    const currentUserCart = await Cart.findOne({ userId: userId });

    if (currentUserCart) {
      let itemArray = { productId: productId, quantity: 1 };
      currentUserCart.items.push(itemArray);
      currentUserCart.save();
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteItem = () => {};

const deleteAllItems = () => {};

export { getCart, createCart, addItem, deleteItem, deleteAllItems };
