const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/error");

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
