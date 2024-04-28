// Imports
import User from '../models/User';
import { Request, Response } from 'express';
import { generateConfirmToken } from '../helpers/model.helpers';
import sendTemplateEmail from '../helpers/email.helper';
import {
  REGISTER_PAGE,
  FORGOT_PASSWORD_PAGE,
  LOGIN_PAGE,
  NEW_ACCOUNT,
  ACCOUNT_CONFIRMATION_PAGE,
  RESET_PASSWORD_PAGE,
} from '../constants/PAGE_OPTIONS';
import {
  CONFIRM_YOUR_ACCOUNT,
  EMAIL_IN_USE,
  INVALID_TOKEN,
  RECOVER_PASSWORD_EMAIL,
  UNEXPECTED,
  USER_NOT_EXISTS,
} from '../constants/MESSAGES';

/**
 * Creates a new User in the database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error(EMAIL_IN_USE);
    return res.render('auth/register', {
      ...REGISTER_PAGE,
      error_message: error.message,
      values: { ...req.body },
    });
  }
  try {
    const user = new User(req.body);
    user.token = generateConfirmToken();
    await user.save();
    await sendTemplateEmail(user.email, 'account_confirmation_email', {
      token: user.token,
    });
    return res.render('templates/message', {
      ...NEW_ACCOUNT,
    });
  } catch (err: unknown) {
    const error = new Error(UNEXPECTED);
    return res.render('auth/register', {
      ...REGISTER_PAGE,
      error_message: error.message,
      values: { ...req.body },
    });
  }
};

/**
 * Confirms an User in the database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const confirm = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ token });
  if (!confirmUser) {
    const error = new Error(INVALID_TOKEN);
    return res.render('templates/message', {
      ...ACCOUNT_CONFIRMATION_PAGE,
      message: error.message,
    });
  }
  try {
    confirmUser.confirmed = true;
    confirmUser.token = '';
    await confirmUser.save();
    return res.redirect('../login');
  } catch (err: unknown) {
    const error = new Error(INVALID_TOKEN);
    return res.render('templates/message', {
      ...ACCOUNT_CONFIRMATION_PAGE,
      message: error.message,
    });
  }
};

/**
 * Retrieves all Users from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const Users = await User.find({});
    return res.json(Users);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');

    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Retrieves an User from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Updates User info
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const updateUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send('User_not_exists');
    }
    res.json(updatedUser);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Deletes an User
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User_not_exists');
    }
    return res.status(204).send();
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Sends forgot password email
 * @param req
 * @param res
 * @returns Promise<Response | void>
 */
const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(USER_NOT_EXISTS);
    return res.render('auth/forgotPassword', {
      ...FORGOT_PASSWORD_PAGE,
      error_message: error.message,
      values: { ...req.body },
    });
  }
  try {
    user.token = generateConfirmToken();
    await user.save();
    sendTemplateEmail(email, 'forgot_password_email', {
      token: user.token,
    });
    return res.render('auth/forgotPassword', {
      ...FORGOT_PASSWORD_PAGE,
      values: { ...req.body },
      message: RECOVER_PASSWORD_EMAIL,
    });
  } catch (err) {
    const error = new Error(UNEXPECTED);
    return res.render('auth/forgotPassword', {
      ...FORGOT_PASSWORD_PAGE,
      error_message: error.message,
      values: { ...req.body },
    });
  }
};

/**
 * Renews User password
 * @param req
 * @param res
 * @returns Promise<Response | void>
 */
const newPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token);
  const { password } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = '';
    try {
      await user.save();
      return res.redirect('/users/login');
    } catch (err) {
      const error = new Error('unexpected_error');
      return res.status(404).json({ msg: error.message });
    }
  } else {
    const error = new Error('invalid_token');
    return res.status(404).json({ msg: error.message });
  }
};

// Views
const loginForm = (req: Request, res: Response) => {
  res.render('auth/login', { ...LOGIN_PAGE });
};
const registerForm = (req: Request, res: Response) => {
  res.render('auth/register', { ...REGISTER_PAGE });
};
const forgotPasswordForm = (req: Request, res: Response) => {
  res.render('auth/forgotPassword', { ...FORGOT_PASSWORD_PAGE });
};
const resetPasswordForm = (req: Request, res: Response) => {
  res.render('auth/resetPassword', {
    ...RESET_PASSWORD_PAGE,
    token: req.params.token,
  });
};

export {
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
};
