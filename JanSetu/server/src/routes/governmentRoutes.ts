import { Router } from 'express';
import { GovernmentController } from '../controllers/governmentController.js';
import { optionalAuthenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/problems', optionalAuthenticateUser, GovernmentController.getProblems);
router.put('/problems/:id/verify', optionalAuthenticateUser, GovernmentController.verifyProblem);
router.put('/problems/:id/status', optionalAuthenticateUser, GovernmentController.updateStatus);

export default router;
