import { Router } from 'express';
import { ImpactController } from '../controllers/impactController.js';
import { optionalAuthenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/stats', optionalAuthenticateUser, ImpactController.getImpactStats);

export default router;
