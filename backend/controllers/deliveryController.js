import User from "../models/User.js";
import Order from "../models/Order.js";
import { genToken } from "../utils/jwtUtils.js";

// driver login (for simplicity drivers are users with role 'driver')
export const driverLogin = async (req, res, next) => {
  try {
    const { phone, password, email } = req.body;
    // allow login by phone+password or email+password
    const user = phone ? await User.findOne({ phone }) : await User.findOne({ email });
    if (!user || user.role !== "driver") return res.status(401).json({ message: "Invalid credentials or not a driver" });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ agent: { id: user._id, name: user.name, phone: user.phone }, token: genToken(user._id) });
  } catch (err) { next(err); }
};

// get assigned orders for authenticated driver
export const getDriverOrders = async (req, res, next) => {
  try {
    const driverId = req.user._id;
    if (req.user.role !== "driver") return res.status(403).json({ message: "Forbidden" });
    const orders = await Order.find({ assignedDriver: driverId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};
