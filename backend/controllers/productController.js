import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

// create product (admin)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, unit, stock } = req.body;
    const files = req.files || [];
    const images = [];

    // upload to cloudinary if configured else store local path
    for (const f of files) {
      if (process.env.CLOUDINARY_API_KEY) {
        const result = await cloudinary.uploader.upload(f.path, { folder: "swiftdrop/products" });
        images.push(result.secure_url);
        // delete local
        fs.unlinkSync(f.path);
      } else {
        images.push(`/uploads/${path.basename(f.path)}`);
      }
    }

    const p = new Product({ name, description, price, category, unit, stock, images });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    next(err);
  }
};

// list
export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, q, category } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(filter);
    res.json({ products, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updates = req.body;
    const p = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
