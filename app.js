const logger = require("./middlewares/logger");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler, notFound } = require("./middlewares/errors");
const connectToDb = require("./config/db");

// Connection To DB
connectToDb();

// Init App
const app = express();
// Apply Middlewares to accept json
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Error Not Found
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
