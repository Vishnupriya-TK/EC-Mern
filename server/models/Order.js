import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    name: String,
    price: Number,
    qty: { type: Number, default: 1 },
    image: String,
    type: { type: String, enum: ["product", "package"] }
  }],
  total: {
    type: Number,
    required: true
  },
  address: {
    label: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: {
    type: String,
    enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
    default: "placed"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
