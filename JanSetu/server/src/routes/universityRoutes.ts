import { Router } from 'express';
import { UniversityController } from '../controllers/universityController.js';
import { optionalAuthenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/challenges', optionalAuthenticateUser, UniversityController.getChallenges);
router.get('/matches', optionalAuthenticateUser, UniversityController.getMatches);
router.post('/problems/:id/interest', optionalAuthenticateUser, UniversityController.expressInterest);

export default router;
