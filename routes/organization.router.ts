import express from 'express';
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOrganization,
  getAllOrganizations,
} from '../controllers/organization.controller';

const organizationRouter = express.Router();

// Rutas para los torneos
organizationRouter.post('/', createOrganization);
organizationRouter.get('/', getAllOrganizations);
organizationRouter.get('/:id', getOrganization);
organizationRouter.put('/:id', updateOrganization);
organizationRouter.delete('/:id', deleteOrganization);

export default organizationRouter;
