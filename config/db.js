const mongoose = require("mongoose");

// Connection to database
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Connection Failed To Connect to MongoDB", error);
  }
}

module.exports = connectToDb;