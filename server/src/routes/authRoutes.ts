import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/me', authenticateUser, AuthController.getMe);

export default router;
