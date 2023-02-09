const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection Successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
