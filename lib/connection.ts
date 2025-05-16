import mongoose from 'mongoose';

let isConnected = false;

async function dbConnection() {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = process.env.MongoDB_URI;

  if (!mongoUri) {
    throw new Error("❌ MongoDB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUri); // Now it's guaranteed to be a string
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnection;
