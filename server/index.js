import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_travel_store";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
app.get("/", (_req, res) => res.send("API Running..."));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
