import { Router } from 'express';
import { CsrController } from '../controllers/csrController.js';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Opportunities read
router.get('/opportunities', optionalAuthenticateUser, CsrController.getOpportunities);

// Protected CSR support pledge endpoint
router.post(
  '/problems/:id/interest',
  authenticateUser,
  authorizeRole(['INDUSTRY_CSR', 'CSR', 'INDUSTRY']),
  CsrController.expressInterest
);

export default router;
