import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Category", categorySchema);
