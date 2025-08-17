import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = express.Router();

router.get("/", async (_req, res) => res.json(await Product.find()));

router.post("/", protect, adminOnly, async (req, res) => {
  const created = await Product.create(req.body);
  res.status(201).json(created);
});

export default router;
