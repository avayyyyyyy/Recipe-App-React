const mongoose = require("mongoose");
const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("DB Connection Successful");
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
