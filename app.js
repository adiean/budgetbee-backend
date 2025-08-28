const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/tansactionRouter");
const cors = require("cors");
const app = express();
const URL = process.env.database_url;


//! Connect to mongoDb
mongoose
  .connect(URL)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

//!Cors Configuratin
const corsOptions = { origin: ["http://localhost:5173", "https://budgetbees.vercel.app"] };
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
  console.log(`Server is running on ${PORT}`);
});
