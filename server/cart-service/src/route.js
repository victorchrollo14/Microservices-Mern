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
cartRouter.get("/:userId", verifyToken, getCart);
cartRouter.put("/add/:productId", verifyToken, addItem);
cartRouter.delete("/delete/:productId", verifyToken, deleteItem);
cartRouter.post("/clear", verifyToken, deleteAllItems);
