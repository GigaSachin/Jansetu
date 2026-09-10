import { Router } from 'express';
import { GovernmentController } from '../controllers/governmentController.js';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Public / optional read
router.get('/problems', optionalAuthenticateUser, GovernmentController.getProblems);

// Protected Government administrative endpoints
router.put(
  '/problems/:id/verify',
  authenticateUser,
  authorizeRole(['GOVERNMENT']),
  GovernmentController.verifyProblem
);

router.put(
  '/problems/:id/status',
  authenticateUser,
  authorizeRole(['GOVERNMENT']),
  GovernmentController.updateStatus
);

export default router;
