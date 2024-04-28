import express from 'express';
import {
  createEmail,
  deleteEmail,
  getAllEmails,
  getEmail,
  updateEmail,
} from '../controllers/email.controller';

const emailRouter = express.Router();

// Get
emailRouter.get('/', getAllEmails);
emailRouter.get('/:id', getEmail);

// Put
emailRouter.put('/:id', updateEmail);

// Post
emailRouter.post('/', createEmail);

// Delete
emailRouter.delete('/:id', deleteEmail);

export default emailRouter;
