const express = require("express");
const { connectDB } = require("./Connection");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes");
const { verifyUser } = require("./Middlewares/VerifyUser");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(express.cookie())
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  connectDB(process.env.MONGO_URI);
  console.log(`Server Started on Port ${process.env.PORT} `);
});
