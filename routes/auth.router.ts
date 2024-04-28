// Imports
import express, { Request, Response } from 'express';
import {
  googleAuthentication,
  googleAuthenticationCallback,
  localAuthentication,
} from '../controllers/auth.controller';
import { validateForm } from '../middlewares/validateForm.middleware';
import { LOGIN_FORM_VALIDATION } from '../constants/FORM_VALIDATION_CHAINS';
import { DASHBOARD_HOME_PAGE, LOGIN_PAGE } from '../constants/PAGE_OPTIONS';
import { AUTH_COOKIE } from '../constants/COOKIE_CONFIG';
// Express Router instance
const authRouter = express.Router();

// Google auth endpoints
authRouter.get('/google', googleAuthentication);
authRouter.get('/google/callback', googleAuthenticationCallback);

// Define an interface representing the shape of the extended request object
interface AuthenticatedRequest extends Request {
  token?: string;
  authError?: string;
}
// Local auth endpoints
authRouter.post(
  '/local',
  validateForm(LOGIN_FORM_VALIDATION),
  localAuthentication,
  (req: AuthenticatedRequest, res) => {
    let { authError, token } = req;
    if (authError) {
      return res.render('auth/login', {
        ...LOGIN_PAGE,
        server_error: authError,
        values: { ...req.body },
      });
    }
    if (token) {
      res.cookie('JWT', token, AUTH_COOKIE);
    }
    return res.redirect('/dashboard/home');
  }
);

export default authRouter;
