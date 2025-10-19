import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  qty: Number
}, { _id: false });

const addressSchema = new mongoose.Schema({
  label: String,
  addressLine: String,
  city: String,
  postalCode: String,
  lat: Number,
  lng: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  shippingAddress: addressSchema,
  paymentMethod: String,
  itemsPrice: Number,
  deliveryFee: Number,
  totalPrice: Number,
  status: { type: String, default: "Pending" },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
