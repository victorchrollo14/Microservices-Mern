// user -> user database
// product -> product database
// cart -> cart database
// event bus -> to communicate between microservices
// api endpoint -> using nginx as a reverse proxy for microservices.

// simple login system - email and password.
// interservice comm -> add remove products to cart, different cart for different user.

import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import session from "express-session";

import userRouter from "./userController.js";

const PORT = 3000;
const app = Express();

const corsOption = {
  origin: [
    "http://localhost:4000",
    "http://localhost:3001",
    "http://localhost:5000",
    "http://localhost:5173",
  ],
  Credential: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

// parsing data from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "dogs",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionConfig));

// routing
app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.use("/", userRouter);

const runServer = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) console.log("connected to userDB Database");

    app.listen(PORT, () => {
      console.log(`user service running on port ${PORT}`);
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

runServer();
