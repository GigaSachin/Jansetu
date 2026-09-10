import { Router } from 'express';
import { ProblemController } from '../controllers/problemController.js';
import { optionalAuthenticateUser, authenticateUser } from '../middleware/authMiddleware.js';
import { validateProblemCreation } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/', optionalAuthenticateUser, validateProblemCreation, ProblemController.createProblem);
router.get('/', optionalAuthenticateUser, ProblemController.getProblems);

router.get('/:id', optionalAuthenticateUser, ProblemController.getProblemById);
router.put('/:id', optionalAuthenticateUser, ProblemController.updateProblem);

router.post('/:id/status', optionalAuthenticateUser, ProblemController.updateStatus);
router.get('/:id/journey', optionalAuthenticateUser, ProblemController.getJourney);
router.get('/:id/ai', optionalAuthenticateUser, ProblemController.getAiAnalysis);
router.get('/:id/matches', optionalAuthenticateUser, ProblemController.getMatches);
router.post('/:id/attachments', optionalAuthenticateUser, ProblemController.addAttachment);

export default router;
