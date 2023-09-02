import { channel } from "./cartQueue.js";
import Cart from "./model.js";

const getCart = () => {};

const createCart = async (user) => {
  try {
    const { _id } = user.newUser;
    console.log(_id);
    const cart = new Cart({
      userId: _id,
      items: [{ productId: "64ecce155ac72861f17708fe", quantity: 1 }],
    });

    await cart.save();
    console.log("cart created");
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const addItem = () => {};

const deleteItem = () => {};

const deleteAllItems = () => {};

export { getCart, createCart, addItem, deleteItem, deleteAllItems };
