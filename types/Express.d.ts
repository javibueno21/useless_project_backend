// custom.d.ts (or express.d.ts)

// Import the Request type from Express
import { Request } from 'express';

// Extend the Request interface to include csrfToken property
declare module 'express' {
  interface Request {
    csrfToken?: () => string;
  }
}
