import { Router } from "express";
import { getData } from "./controller.js";

const productRouter = Router();

productRouter.get("/getData", getData);

export { productRouter };
