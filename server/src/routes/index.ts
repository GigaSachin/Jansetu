import { Router } from 'express';
import authRoutes from './authRoutes.js';
import problemRoutes from './problemRoutes.js';
import institutionRoutes from './institutionRoutes.js';
import governmentRoutes from './governmentRoutes.js';
import universityRoutes from './universityRoutes.js';
import csrRoutes from './csrRoutes.js';
import impactRoutes from './impactRoutes.js';
import { AiEngineService } from '../services/aiEngineService.js';
import { sendSuccess } from '../utils/responseHelper.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/problems', problemRoutes);
router.use('/institutions', institutionRoutes);
router.use('/government', governmentRoutes);
router.use('/university', universityRoutes);
router.use('/csr', csrRoutes);
router.use('/impact', impactRoutes);

// System & AI Gateway Health Check
router.get('/health', async (req, res) => {
  const aiHealth = await AiEngineService.checkHealth();
  sendSuccess(res, {
    status: 'HEALTHY',
    service: 'JanSetu-Backend-API-Gateway',
    version: '4.0.0',
    timestamp: new Date().toISOString(),
    aiEngine: {
      status: aiHealth.isOnline ? 'ONLINE' : 'OFFLINE_RESILIENT',
      url: process.env.AI_ENGINE_URL || 'http://localhost:8000',
      details: aiHealth.details || null
    }
  });
});

export default router;
