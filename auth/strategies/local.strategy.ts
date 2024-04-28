// Imports
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import User from '../../models/User';
import { jwtSignToken } from '../../helpers/jwt.helpers';
import {
  CONFIRM_YOUR_ACCOUNT,
  USER_NOT_EXISTS,
  WRONG_PASSWORD,
} from '../../constants/MESSAGES';

/**
 * Implements OAuth local strategy (no session)
 * @param passport PassportStatic
 * @param options StrategyOptions
 
 */

const localStrategyConfig = (
  passport: PassportStatic,
  options: IStrategyOptions
) => {
  const { emailField, passwordField } = options;
  passport.use(
    new LocalStrategy(
      { emailField, passwordField },

      async (email: string, password: string, done) => {
        try {
          let user = await User.findOne({ email });
          // Check if User exists
          if (!user) {
            const error: Error = new Error(USER_NOT_EXISTS);
            return done(error, undefined);
          }
          // Checks for password match
          const isPasswordValid: boolean = await user?.checkPassword(password);
          if (!isPasswordValid) {
            const error: Error = new Error(WRONG_PASSWORD);
            return done(error, undefined);
          }
          // Check if User is confirmed
          if (!user?.confirmed) {
            const error: Error = new Error(CONFIRM_YOUR_ACCOUNT);
            return done(error, undefined);
          }

          const token: string = jwtSignToken(
            user._id.toString(),
            '24h',
            'authentication'
          );
          user.token = token;
          await user.save();

          return done(undefined, token);
        } catch (err: unknown) {
          const error = new Error('unexpected_error');
          return done(error, undefined);
        }
      }
    )
  );
};

export default localStrategyConfig;
