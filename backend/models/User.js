import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  label: String,
  addressLine: String,
  city: String,
  postalCode: String,
  lat: Number,
  lng: Number
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin", "driver"], default: "user" },
  addresses: [addressSchema],
  fcmToken: { type: String }, // device token for push notifications
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  if (!this.password) return false;
  return await bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema);
