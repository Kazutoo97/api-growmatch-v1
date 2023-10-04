import mongoose from "mongoose";

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

export default dbConn;
