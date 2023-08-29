import { Products } from "./model.js";

const getData = async (req, res) => {
  const data = await Products.find();
  res.status(200).json(data);
};

export { getData };
