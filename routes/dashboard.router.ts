import express from 'express';
import checkToken from '../middlewares/checkToken.middleware';
import { homePage, adminPanel } from '../controllers/dashBoard.controller';
import { authenticateJWT, requireAdmin } from '../middlewares/jwt.middleware';

const dashBoardRouter = express.Router();

dashBoardRouter.get('/home', authenticateJWT, homePage);
dashBoardRouter.get('/admin', authenticateJWT, requireAdmin, adminPanel);

export default dashBoardRouter;
