import { Router } from 'express';
import { CsrController } from '../controllers/csrController.js';
import { optionalAuthenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/opportunities', optionalAuthenticateUser, CsrController.getOpportunities);
router.post('/problems/:id/interest', optionalAuthenticateUser, CsrController.expressInterest);

export default router;
