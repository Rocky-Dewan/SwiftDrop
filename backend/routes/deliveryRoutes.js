import express from "express";
import { driverLogin, getDriverOrders } from "../controllers/deliveryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", driverLogin);
router.get("/orders", protect, getDriverOrders);

export default router;
