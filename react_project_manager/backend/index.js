import express from "express";
import dotenv from 'dotenv';
import connectMongoose from "./config/db.js";

const app = express();
dotenv.config();
connectMongoose();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App is running succesfully");
});
