import Express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { cartRouter } from "./route";

const app = Express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:3001",
    "http://localhost:5000",
    "http://localhost:5173",
  ],
  Credential: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/cart", cartRouter);

const runServer = async () => {
  const connect = await mongoose.connect(process.env.CART_MONGODB_URI);
  if (connect) console.log(`connected to cartDB Database`);

  app.listen(PORT, () => {
    console.log(`running cart service on port ${PORT}`);
  });
};

runServer();
