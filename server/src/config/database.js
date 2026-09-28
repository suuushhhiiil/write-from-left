import mongoose from "mongoose";
import "./env.js";

const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DATABASE_NAME}`,
    );
    console.log(
      `\n MongoDB connected successfully to host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
