import express from "express";
import { registerUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post('/', registerUser);

export default userRoutes;