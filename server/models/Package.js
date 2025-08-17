import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["Roadways", "Airways", "Railways", "Waterways"] },
  price: Number,
  description: String
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);
