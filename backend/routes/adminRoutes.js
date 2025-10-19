import express from "express";
import { listUsers, adminListProducts, adminListOrders } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), listUsers);
router.get("/products", protect, authorizeRoles("admin"), adminListProducts);
router.get("/orders", protect, authorizeRoles("admin"), adminListOrders);

export default router;
