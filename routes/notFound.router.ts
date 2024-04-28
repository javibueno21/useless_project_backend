import express, { Request, Response } from 'express';

const notFoundRouter = express.Router();

notFoundRouter.all('*', (req: Request, res: Response) => {
  return res.render('NotFound');
});

export default notFoundRouter;
