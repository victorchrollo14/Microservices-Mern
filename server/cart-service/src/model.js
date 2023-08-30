import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  userId: String,
  items: Array,
});

const Cart = model("Cart", CartSchema);

export default Cart;
