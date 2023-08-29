import mongoose, { Schema, model } from "mongoose";
import "dotenv/config";

const ProductSchema = new Schema({
  title: String,
  subtitle: String,
  price: Number,
  images: Array,
  category: String,
});

const Products = model("Products", ProductSchema);

export { Products };
