import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

// POST /api/users/register
router.post(
  "/register",
  [body("name").notEmpty(), body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: { id: user._id, name, email, role: user.role }, token: makeToken(user._id) });
  }
);

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });
  res.json({ user: { id: user._id, name: user.name, email, role: user.role }, token: makeToken(user._id) });
});

// GET /api/users/me
router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
