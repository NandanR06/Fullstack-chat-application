import mongoose from "mongoose";

export const database = async () => {
  try {
    const cnt = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected: ${cnt.connection.host}`);
  } catch (error) {
    console.log(`connection failed: ${error}`);
  }
};
