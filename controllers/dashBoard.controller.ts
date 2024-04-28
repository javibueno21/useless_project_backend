import { Request, Response } from 'express';
import {
  DASHBOARD_ADMIN_PAGE,
  DASHBOARD_HOME_PAGE,
} from '../constants/PAGE_OPTIONS';

const homePage = (req: Request, res: Response) => {
  return res.render('dashboard/home', { ...DASHBOARD_HOME_PAGE });
};
const adminPanel = (req: Request, res: Response) => {
  return res.render('dashboard/admin', { ...DASHBOARD_ADMIN_PAGE });
};

export { homePage, adminPanel };
