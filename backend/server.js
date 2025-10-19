import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// socket.io setup
const io = new SocketIOServer(server, {
  cors: { origin: "*" }
});
app.set("io", io); // make io available in controllers via req.app.get('io')

// short in-memory mapping from userId -> socketId (for simple demo)
const socketsByUser = new Map();
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", (data) => {
    // data = { userId }
    if (data?.userId) socketsByUser.set(String(data.userId), socket.id);
  });

  socket.on("disconnect", () => {
    for (const [userId, sId] of socketsByUser.entries()) {
      if (sId === socket.id) socketsByUser.delete(userId);
    }
    console.log("Socket disconnected:", socket.id);
  });
});
app.set("socketsByUser", socketsByUser);

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads")); // in dev; use cloudinary in prod

// connect db
connectDB();

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/admin", adminRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
