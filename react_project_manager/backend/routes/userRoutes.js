import express from "express";
import { retrieveUsers, createUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', retrieveUsers);
userRoutes.post('/', createUser);

export default userRoutes;