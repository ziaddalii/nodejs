const mongoose = require("mongoose");

// Connection to database
function connectToDb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Connection Failed To Connect to MongoDB", error);
  }
}

module.exports = connectToDb;