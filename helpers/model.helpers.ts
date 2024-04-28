// Imports
import { Profile } from 'passport-google-oauth20';
import { IUser } from '../types/User';
import User from '../models/User';

const newGoogleUser = async (UserInfo: Profile): Promise<IUser> => {
  const email: string | undefined = UserInfo.emails?.[0].value;
  const name: string | undefined = UserInfo.displayName;
  const img: string | undefined = UserInfo.photos?.[0].value;
  let user = await User.findOne({ email }).exec();
  if (!user) {
    user = new User({
      email,
      name,
      Username:
        (UserInfo._json.given_name ?? '') + (UserInfo._json.family_name ?? ''),
      img,
      confirmed: false,
    });
    await user.save();
  }

  return user;
};

/**
 * Generates a token for User account confirmation
 * @returns string
 */
const generateConfirmToken = (): string => {
  let a: string = Math.random().toString(32).substring(2);
  let b: string = Date.now().toString(32);
  return a + b;
};

export { newGoogleUser, generateConfirmToken };
