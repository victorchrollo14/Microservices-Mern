import { Router } from "express";
import { verifyToken } from "./auth.js";
import {
  createCart,
  getCart,
  addItem,
  deleteAllItems,
  deleteItem,
} from "./controller.js";

export const cartRouter = Router();

cartRouter.post("/", createCart);
cartRouter.get("/", verifyToken, getCart);
cartRouter.post("/add/:productId", verifyToken, addItem);
cartRouter.post("/delete/:productId", verifyToken, deleteItem);
cartRouter.post("/clear", verifyToken, deleteAllItems);
