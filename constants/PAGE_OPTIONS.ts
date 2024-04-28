import { IPageOptions } from '../types/Page';

const FORGOT_PASSWORD_PAGE: IPageOptions = {
  title: 'Forgot password',
  heading: 'Recover your password for UselessProject',
};

const LOGIN_PAGE: IPageOptions = {
  title: 'Sign up',
  heading: 'Log in to your account',
};
const REGISTER_PAGE: IPageOptions = {
  title: 'Sign in',
  heading: 'Create an account',
};
const NEW_ACCOUNT: IPageOptions = {
  title: 'Account created successfully',
  heading: 'Your account was created successfully.',
  message:
    'Please verify your account by following the confirmation link sent to your email',
};
const ACCOUNT_CONFIRMATION_PAGE: IPageOptions = {
  title: 'Account confirmation',
  heading: '',
};

const INVALID_TOKEN_PAGE: IPageOptions = {
  title: 'Invalid token',
  heading: '',
  message: 'Confirmation token is not valid',
};
const RESET_PASSWORD_PAGE: IPageOptions = {
  title: 'Enter your new password',
  heading: '',
};
const DASHBOARD_HOME_PAGE: IPageOptions = {
  title: 'Home',
};
const DASHBOARD_ADMIN_PAGE: IPageOptions = {
  title: 'Admin',
};
export {
  FORGOT_PASSWORD_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  NEW_ACCOUNT,
  ACCOUNT_CONFIRMATION_PAGE,
  INVALID_TOKEN_PAGE,
  RESET_PASSWORD_PAGE,
  DASHBOARD_HOME_PAGE,
  DASHBOARD_ADMIN_PAGE,
};
