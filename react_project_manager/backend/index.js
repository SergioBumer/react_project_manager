import express from "express";
import dotenv from 'dotenv';
import connectMongoose from "./config/db.js";

// Routing imports

import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
connectMongoose();

const PORT = process.env.PORT || 3000;

// Routing

app.use("/api/v1/users", userRoutes)


app.listen(PORT, () => {
  console.log("App is running succesfully");
});
