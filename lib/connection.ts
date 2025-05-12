
import mongoose from 'mongoose';

let isConnected = false;

async function dbConnection() {
  if (isConnected|| mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const db = await mongoose.connect(`mongodb+srv://murony59:${process.env.MONGODB_PASSWORD}@cluster0.lwelps0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnection;
