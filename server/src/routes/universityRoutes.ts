import { Router } from 'express';
import { UniversityController } from '../controllers/universityController.js';
import { authenticateUser, optionalAuthenticateUser } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Challenges read
router.get('/challenges', optionalAuthenticateUser, UniversityController.getChallenges);
router.get('/matches', optionalAuthenticateUser, UniversityController.getMatches);

// Protected university interest registration
router.post(
  '/problems/:id/interest',
  authenticateUser,
  authorizeRole(['UNIVERSITY']),
  UniversityController.expressInterest
);

export default router;
