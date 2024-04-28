// Imports
const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

/**
 * Guard middleware to prevent invalid JWT auth token from requesting to server
 * @param req
 * @param res
 * @param next
 */
const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.cookies.JWT;
  if (!token) {
    return res.redirect('/users/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Ensure your user schema has a 'token' field
    // Check if there's a user and if the token matches
    if (!user || user.token !== token) {
      return res.redirect('/users/login');
    }
    req.user = user;
    next();
  } catch (err) {
    const error: Error = new Error('invalid_token');
    return res.redirect('/users/login');
  }
};

/**
 * Guard middleware check if the requesting User has admin privileges
 * @param req
 * @param res
 * @param next
 * @returns
 */
const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    let user: any = req.user;
    const { role } = user;
    if (role === 'admin') {
      return next();
    }
    const error: Error = new Error('error_unauthorized');
    return res.status(405).json({ msg: error.message });
  } catch (err) {
    const error: Error = new Error('undexpected_error');
    return res.status(401).json({ msg: error.message, err });
  }
};

export { authenticateJWT, requireAdmin };
