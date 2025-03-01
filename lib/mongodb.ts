import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const connection: { isConnected?: number } = {};

export const connectMongo = async () => {
  if (!MONGODB_URI) return console.log("MongoDB_URL not found");
  if (connection.isConnected) return;
  // return console.log("MongoDB is already connected");

  try {
    const database = await mongoose.connect(MONGODB_URI);
    connection.isConnected = database.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
