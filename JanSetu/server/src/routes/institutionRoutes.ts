import { Router } from 'express';
import { InstitutionController } from '../controllers/institutionController.js';

const router = Router();

router.get('/', InstitutionController.getInstitutions);
router.get('/districts', InstitutionController.getDistricts);
router.get('/:id', InstitutionController.getInstitutionById);

export default router;
