import express from "express";
import { registerUser, authenticate, checkToken, recoverPassword, checkTokenToRecoverPassword, updatePassword, profile } from "../controllers/userController.js";
import checkAuth from '../middleware/checkAuth.js';
const userRoutes = express.Router();

userRoutes.post('/', registerUser);
userRoutes.post('/login', authenticate);
userRoutes.get('/check/:token', checkToken);
userRoutes.post('/recoverPassword', recoverPassword);


userRoutes.route('/recoverPassword/:token').get(checkTokenToRecoverPassword).post(updatePassword);

userRoutes.get('/profile', checkAuth, profile);

export default userRoutes;