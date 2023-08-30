import { Router } from "express";
import { register, login, checkLogin } from "./userController.js";
import { verifyToken } from "./auth.js";

const userRouter = Router();

userRouter.post("/user/register", register);
userRouter.post("/user/login", login);
userRouter.get("/user/checkLogin", verifyToken, checkLogin);

export default userRouter;
