// Imports
import express from 'express';
import {
  register,
  confirm,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  newPassword,
  loginForm,
  registerForm,
  forgotPasswordForm,
  resetPasswordForm,
} from '../controllers/user.controller';
import { requireAdmin } from '../middlewares/jwt.middleware';
import checkToken from '../middlewares/checkToken.middleware';
import { validateForm } from '../middlewares/validateForm.middleware';
import { REGISTER_FORM_VALIDATION } from '../constants/FORM_VALIDATION_CHAINS';

// Express Router instance
const userRouter = express.Router();

// Views
userRouter.get('/login', loginForm);
userRouter.get('/register', registerForm);
userRouter.get('/forgot-password', forgotPasswordForm);

userRouter.get('/', getAllUsers);
userRouter.get('/confirmation/:token', checkToken, confirm);
userRouter.post('/register', validateForm(REGISTER_FORM_VALIDATION), register);
userRouter.post('/forgot-password', forgotPassword);
userRouter.get('/forgot-password/:token', checkToken, resetPasswordForm);
userRouter.post('/reset-password/:token', newPassword);
//userRouter.post('/forgot-password/:token', checkToken, newPassword);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', requireAdmin, deleteUser);

export default userRouter;
