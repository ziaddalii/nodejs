// Core Module
// const http = require("http");
const logger = require("./middlewares/logger");
// CREATING SERVER USING NODE JS

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("<h1>Welcome to NODE JS</h1>");
//     res.end();
//   }
//   if (req.url === "/api/books") {
//     res.write(JSON.stringify(books));
//     res.end();
//   }
// });

// const PORT = 5000;
// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const { log } = require("./logger");
// console.log("welcome to node js");

// log();

// CREATING SERVER USING EXPRESS JS
const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { errorHandler, notFound } = require("./middlewares/errors");
dotenv.config();
// Connection to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.log("Connection Failed To Connect to MongoDB", error);
  });

// Init App
const app = express();
// Apply Middlewares to accept json
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

// Error Not Found
app.use(notFound)

// Error Handler Middleware
app.use(errorHandler)

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
