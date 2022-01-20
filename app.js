const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

//  middleware
app.use(express.json());
// routes middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);

// connecting DB
mongoose.connect(process.env.DB, () => {
  console.log("DATABASE IS CONNECTIONG...");
});

app.listen(3000, () => {
  console.log("APP IS RUNNING ON PORT 3000");
});
