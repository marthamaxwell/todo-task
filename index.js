import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const myPort = 3001;
const DB = process.env.DATABASE;

app.use(express.json());
app.use("/", todoRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DATABASE connected!");
    app.listen(myPort, () => {
      console.log(`Server is running on ${myPort}`);
    });
  })
  .catch(() => {
    console.log("DATABASE NOT Connected!");
  });
