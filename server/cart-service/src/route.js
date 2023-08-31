import { Router } from "express";
import { verifyToken } from "./auth";

export const cartRouter = Router();

cartRouter.post("/", verifyToken, createCart);
cartRouter.get("/", verifyToken, getCart);
cartRouter.post("/add/:productId", verifyToken, addItem);
cartRouter.post("/delete/:productId", verifyToken, deleteItem);
cartRouter.post("/clear", verifyToken, deleteAllItems);
