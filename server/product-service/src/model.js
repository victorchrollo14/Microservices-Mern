import mongoose, { Schema, model } from "mongoose";
import "dotenv/config";

const ProductSchema = new Schema({
  title: String,
  subtitle: String,
  price: Number,
  images: Array,
  category: String,
});

const Products = model("Products", ProductSchema);

const connect = async () => {
  await mongoose.connect(process.env.PRODUCT_MONGODB_URI);
  console.log("connected");
  const products = [
    {
      title: "The Pack Pant",
      subtitle: "in Coal Fleece",
      price: 138,
      images: [
        "ProductAssets/bottoms/instock_m_q122_demojean_rinsedorganic_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q122_demojean_rinsedorganic_002_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
    {
      title: "The Foundation Short",
      subtitle: "in Organic Steeple Grey",
      price: 92,
      images: [
        "ProductAssets/bottoms/instock_m_q122_slimjean_rinsed_organic_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q122_slimjean_rinsed_organic_002_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
    {
      title: "The Foundation Short",
      subtitle: "in Organic Sagebrush",
      price: 92,
      images: [
        "ProductAssets/bottoms/instock_m_q123_Apres_Pant_Charcoal_Donegal_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q123_Apres_Pant_Charcoal_Donegal_003_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
    {
      title: "The Foundation Short",
      subtitle: "in Organic Dune",
      price: 92,
      images: [
        "ProductAssets/bottoms/instock_m_q123_Apres_Pant_Oat_Donegal_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q123_Apres_Pant_Oat_Donegal_004_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
    {
      title: "The Foundation Short",
      subtitle: "in Organic Marine",
      price: 92,
      images: [
        "ProductAssets/bottoms/instock_m_q123_Apres_Short_Granite_60_40_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q123_Apres_Short_Granite_60_40_003_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
    {
      title: "The Morse Short",
      subtitle: "in Slate Slub",
      price: 98,
      images: [
        "ProductAssets/bottoms/instock_m_q123_Apres_Short_Seagreen_60_40_001_530x.progressive.jpg",
        "ProductAssets/bottoms/instock_m_q123_Apres_Short_Seagreen_60_40_003_530x.progressive.jpg",
      ],
      category: "Bottoms",
    },
  ];

  for (const prod of products) {
    console.log(prod);
    const newProduct = new Products(prod);

    newProduct.save();
  }
};

connect();
