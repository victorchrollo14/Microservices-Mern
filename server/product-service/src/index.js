import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { productRouter } from "./route.js";

const app = express();
const PORT = 4000;

// parsing data from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cross origin requests
const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000",
    "http://localhost:5173",
  ],
  Credential: true,
  optionStatus: 200,
};
app.use(cors(corsConfig));

// serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  "/product/ProductAssets",
  express.static(path.join(__dirname, "..", "ProductAssets"))
);

// routing
app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.use("/product", productRouter);

const runServer = async () => {
  try {
    await mongoose.connect(process.env.PRODUCT_MONGODB_URI);
    console.log("connected to mongo product Database");

    app.listen(PORT, () => {
      console.log(`Product service running on port ${PORT}`);
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

runServer();
