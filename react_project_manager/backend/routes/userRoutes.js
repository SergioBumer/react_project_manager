import express from "express";
import { registerUser, authenticate, checkToken, recoverPassword, checkTokenToRecoverPassword, updatePassword } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post('/', registerUser);
userRoutes.post('/login', authenticate);
userRoutes.get('/check/:token', checkToken);
userRoutes.post('/recoverPassword', recoverPassword);


userRoutes.route('/recoverPassword/:token').get(checkTokenToRecoverPassword).post(updatePassword);

export default userRoutes;