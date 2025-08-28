const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/tansactionRouter");
const cors = require("cors");
require("dotenv").config(); // <--- add this if you want local .env support

const app = express();
const URL = process.env.DATABASE_URL; // better naming (uppercase, matches env var)

//! Connect to mongoDb
mongoose
  .connect(URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((e) => console.error("❌ MongoDB connection error:", e.message));

//!Cors Configuratin
const corsOptions = {
  origin: [
    "http://localhost:5173",   // dev frontend
    "https://budgetbees.vercel.app" // deployed frontend
  ],
  credentials: true,
};
app.use(cors(corsOptions));

//!Middlewares
app.use(express.json());

//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//!Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
