import mongoose from "mongoose";

const deliveryAgentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: String,
  vehicleInfo: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeliveryAgent", deliveryAgentSchema);
