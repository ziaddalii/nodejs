// Core Module
// const http = require("http");

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
const mongoose = require("mongoose");

// Connection to database
mongoose
  .connect("mongodb://localhost/bookStoreDB")
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

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
