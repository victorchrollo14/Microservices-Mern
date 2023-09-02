import User from "./model.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

import { channel } from "./userQueue.js";

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

    channel.sendToQueue(
      "cart-service-queue",
      Buffer.from(JSON.stringify({ newUser }))
    );

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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY);
    user.password = undefined;

    res.status(200).json({
      token: token,
      message: "loggged in successfully",
      user: user,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const checkLogin = async (req, res) => {
  res.status(200).json({ login: true });
};

export { register, login, checkLogin };
