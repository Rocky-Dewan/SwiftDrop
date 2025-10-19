import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { calcItemsPrice } from "../utils/orderHelper.js";

// create order
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, deliveryFee = 30 } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "No items" });

    const populated = [];
    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) return res.status(400).json({ message: `Product not found ${it.product}` });
      populated.push({ product: p._id, name: p.name, price: p.price, qty: it.qty });
    }

    const itemsPrice = calcItemsPrice(populated);
    const totalPrice = itemsPrice + deliveryFee;

    const order = new Order({
      user: req.user._id,
      items: populated,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryFee,
      totalPrice
    });
    await order.save();

    // socket notify admin and user
    const io = req.app.get("io");
    io?.emit("order:created", { orderId: order._id, totalPrice });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// get user's orders
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

// get order by id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name phone").populate("assignedDriver", "name phone");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) { next(err); }
};

// admin: get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name phone").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

// admin assigns driver
export const assignDriver = async (req, res, next) => {
  try {
    const { driverId } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.assignedDriver = driverId;
    order.status = "PickedUp";
    await order.save();

    // notify driver via socket
    const socketsByUser = req.app.get("socketsByUser");
    const socketId = socketsByUser.get(String(driverId));
    const io = req.app.get("io");
    if (socketId) io.to(socketId).emit("order:assigned", { orderId: order._id });

    res.json(order);
  } catch (err) { next(err); }
};

// update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status;
    await order.save();
    const io = req.app.get("io");
    io?.emit("order:statusUpdated", { orderId: order._id, status });
    res.json(order);
  } catch (err) { next(err); }
};

// driver: orders for driver
export const getOrdersForDriver = async (req, res, next) => {
  try {
    const { driverId } = req.params;
    const orders = await Order.find({ assignedDriver: driverId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};
