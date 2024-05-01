// Imports
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import { PassportStatic } from 'passport';

import { IUser } from '../../types/User';
import { jwtSignToken } from '../../helpers/jwt.helpers';
import { newGoogleUser } from '../../helpers/model.helpers';
const { PassportStatic } = require('passport');

/**
 * Implements OAuth2.0 google strategy (no session)
 * @param passport PassportStatic
 * @param strategy StrategyOptions
 */
const googleStrategyConfig = (
  passport: PassportStatic,
  options: StrategyOptions
): void => {
  passport.use(
    new GoogleStrategy(
      options,
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          // Avoiding duplicate fields
          const email: string | undefined = profile.emails?.[0].value;
          if (!email) {
            const error: Error = new Error(
              'Email not available from google profile'
            );
            return done(error.message, undefined);
          }

          // Create new User instance
          let User: IUser = await newGoogleUser(profile);

          // Check if User is confirmed
          if (!User?.confirmed) {
            const error: Error = new Error('confirm_your_account');
            return done(error.message, undefined);
          }

          // Send User + loginToken
          const loginToken: string = jwtSignToken(
            User._id.toString(),
            '24h',
            'authentication'
          );
          return done(undefined, { ...User, loginToken });
        } catch (err: unknown) {
          console.log(err);
          const error: Error = new Error('unexpected_error');
          return done(error.message, undefined);
        }
      }
    )
  );
};

export default googleStrategyConfig;
