import User from "../models/User.js";
import { genToken } from "../utils/jwtUtils.js";

// register
export const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone) return res.status(400).json({ message: "Name & phone required" });
    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: "Phone already in use" });
    const user = new User({ name, phone, email, password, role });
    await user.save();
    res.status(201).json({ user: { id: user._id, name: user.name, phone: user.phone, role: user.role }, token: genToken(user._id) });
  } catch (err) {
    next(err);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ user: { id: user._id, name: user.name, phone: user.phone, role: user.role }, token: genToken(user._id) });
  } catch (err) {
    next(err);
  }
};

// get profile
export const getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

// update fcm token
export const updateFcmToken = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    req.user.fcmToken = fcmToken;
    await req.user.save();
    res.json({ message: "Token saved" });
  } catch (err) {
    next(err);
  }
};
