import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// admin: list users
export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { next(err); }
};

// admin: list products (wrapper)
export const adminListProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { next(err); }
};

// admin: list orders
export const adminListOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name phone").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};
