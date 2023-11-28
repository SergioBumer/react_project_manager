import express from "express";
import dotenv from "dotenv";
import connectMongoose from "./config/db.js";
import cors from "cors";

// Routing imports

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectMongoose();

//Configure CORS whitelist
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new Error("CORS Error: You are not allowed to access the API. ")
      );
    }
  },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Routing

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log("App is running succesfully");
});
