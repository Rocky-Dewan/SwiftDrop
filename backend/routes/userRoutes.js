import express from "express";
import { register, login, getProfile, updateFcmToken } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/fcm", protect, updateFcmToken);

export default router;
