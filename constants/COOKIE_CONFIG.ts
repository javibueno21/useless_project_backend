import { CookieOptions } from 'express';

const AUTH_COOKIE: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
};

export { AUTH_COOKIE };
