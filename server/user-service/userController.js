import { Router } from "express";
import User from "./model.js";

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const emailExists = await User.exists({ email: email });
    if (emailExists) {
      res.status(409).json({
        error: "Email already exists, try logging in or use a different email",
      });
      return;
    }

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password,
    });
    await newUser.save();

    res
      .status(200)
      .json({ message: `${email} registered successfully, you can login now` });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(409).json({ error: "User Does not exist, register first" });
      return;
    }

    if (password !== user.password) {
      res.status(409).json({
        error: "incorrect password, check if you have entered properly",
      });
      return;
    }


    res.status(200).json({ message: "successfully logged In" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const checkLogin = async (req, res) => {
  console.log(req.session.user);

  try {
    if (req.session.user) {
      res.status(200).json({ login: true });
      return;
    }
    res.status(200).json({ login: false });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/user/checkLogin", checkLogin);

export default userRouter;
