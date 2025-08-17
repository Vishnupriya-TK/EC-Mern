import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Place order (no payment integration; just mark as "placed")
router.post("/", protect, async (req, res) => {
  const { items, address } = req.body;
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "No items" });

  const total = items.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.qty || 1),
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    address,
    status: "placed",
  });
  res.status(201).json(order);
});

// My orders
router.get("/mine", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// Admin: all orders
router.get("/", protect, adminOnly, async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
