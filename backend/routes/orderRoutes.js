import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  assignDriver,
  updateOrderStatus,
  getOrdersForDriver
} from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

// admin
router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/assign/:id", protect, authorizeRoles("admin"), assignDriver);

// update status (driver, user or admin)
router.put("/status/:id", protect, updateOrderStatus);

// driver
router.get("/driver/:driverId", protect, authorizeRoles("driver", "admin"), getOrdersForDriver);

export default router;
