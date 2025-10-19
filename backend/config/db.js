import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not provided in .env");
    const conn = await mongoose.connect(uri, { dbName: "swiftdrop_app" });
    console.log("MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
