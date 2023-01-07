import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection Successfull");
  } catch (error) {
    console.log(error);
  }
};
