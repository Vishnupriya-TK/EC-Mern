import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // <- needs to exist

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_travel_store";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.get("/", (_req, res) => res.send("API Running..."));

app.use("/api/products", productRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
