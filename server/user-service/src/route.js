import { Router } from "express";
import { register, login, checkLogin } from "./userController.js";
import { verifyToken } from "./auth.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/checkLogin", verifyToken, checkLogin);

export default userRouter;
