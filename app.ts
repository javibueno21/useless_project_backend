// Imports
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router';
import passport from 'passport';
import configurePassport from './auth/passport';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './routes/auth.router';
import GOOGLE_AUTH_OPTIONS from './constants/GOOGLE_AUTH_OPTIONS';
import tournamentRouter from './routes/tournament.router';
import organizationRouter from './routes/organization.router';
import emailRouter from './routes/email.router';
import dashBoardRouter from './routes/dashboard.router';
import notFoundRouter from './routes/notFound.router';

// Load .dotenv file
require('dotenv').config();

// Config & Security
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set up Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Public folder
app.use(express.static('public'));

// Auth strategies
configurePassport(GOOGLE_AUTH_OPTIONS, {
  emailField: 'email',
  passwordField: 'password',
});
app.use(passport.initialize());

// Routes
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashBoardRouter);
app.use('/tournament', tournamentRouter);
app.use('/organization', organizationRouter);
app.use('/email', emailRouter);
app.use(notFoundRouter);
export default app;
