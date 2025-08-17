import express from "express";
import Package from "../models/Package.js";
const router = express.Router();

// GET all packages
router.get("/", async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// Add package
router.post("/", async (req, res) => {
  const { name, type, price, description } = req.body;
  const pkg = new Package({ name, type, price, description });
  const saved = await pkg.save();
  res.json(saved);
});

export default router;
