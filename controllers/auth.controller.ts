//Imports
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

// Define an interface representing the shape of the extended request object
interface AuthenticatedRequest extends Request {
  token?: string;
  authError?: string; // Type for storing authentication error message
}

/**
 * TODO trabajar en estos callbacks para renderizar los errores
 * en la view de pug y los redirects sin romper el
 * principio de isngle responsibility
 * @param req
 * @param res
 * @param next
 */
// Auth functionality
const googleAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res, next);
};

const googleAuthenticationCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', {
    session: false,
  })(req, res, next);
};

const localAuthentication = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (error: any, token: string, x: any) => {
      if (error) {
        req.authError = error;
      }
      req.token = token;
      next();
    }
  )(req, res, next);
};

export {
  googleAuthentication,
  googleAuthenticationCallback,
  localAuthentication,
};
