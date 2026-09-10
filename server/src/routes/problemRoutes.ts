import { Router } from 'express';
import { ProblemController } from '../controllers/problemController.js';
import { optionalAuthenticateUser, authenticateUser } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { validateProblemCreation, validateAttachment } from '../middleware/validationMiddleware.js';

const router = Router();

// Problem creation (open to citizens or logged in users)
router.post('/', optionalAuthenticateUser, validateProblemCreation, ProblemController.createProblem);
router.get('/', optionalAuthenticateUser, ProblemController.getProblems);

router.get('/:id', optionalAuthenticateUser, ProblemController.getProblemById);
router.put('/:id', authenticateUser, ProblemController.updateProblem);

// Status transition requires role-authorized user (Government, University, Industry/CSR)
router.post(
  '/:id/status',
  authenticateUser,
  authorizeRole(['GOVERNMENT', 'UNIVERSITY', 'INDUSTRY_CSR']),
  ProblemController.updateStatus
);

router.get('/:id/journey', optionalAuthenticateUser, ProblemController.getJourney);
router.get('/:id/ai', optionalAuthenticateUser, ProblemController.getAiAnalysis);
router.get('/:id/matches', optionalAuthenticateUser, ProblemController.getMatches);
router.post('/:id/attachments', optionalAuthenticateUser, validateAttachment, ProblemController.addAttachment);

export default router;
