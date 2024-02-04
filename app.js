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

// Init App
const app = express();
// Apply Middlewares to accept json
app.use(express.json())

// My Data
const books = [
  {
    id: 1,
    title: "Harry Potter",
    author: "Ahmed El-Sayed Tawfiq",
    desc: "a Sci-fi book",
    price: 125,
  },
  {
    id: 2,
    title: "Harry Potter : Chamber of Philosophy",
    author: "Ahmed El-Sayed Tawfiq",
    desc: "a Sci-fi book",
    price: 215,
  },
];
// HTTP METHODS
app.get("/", (req, res) => {
  res.send("Hello Welcome to expressssssssssss js ");
});

// GET Books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET Book Details
app.get("/api/books/:id", (req, res) => {
  const book = books.find((e) => e.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else res.status(404).json({ message: "book not found" });
});

// POST Add Book
app.post("/api/books", (req, res) => {
  console.log(req.body);
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    desc: req.body.desc,
    price: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book); // 201 => created successfully
});

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
