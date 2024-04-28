import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { INVALID_TOKEN_PAGE } from '../constants/PAGE_OPTIONS';

/**
 * Guard middleware to check confirmation tokens
 * @param req
 * @param res
 * @param next
 */
// TODO quizas el checktoken deberia ser un jwt con tiempo de expiracion PA QUE TENGA MAS SENTIDO
const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { token } = req.params;
  const isValidToken = await User.findOne({ token });
  if (!isValidToken) {
    return res.render('templates/message', { ...INVALID_TOKEN_PAGE });
  }
  next();
};

export default checkToken;
