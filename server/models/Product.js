import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
