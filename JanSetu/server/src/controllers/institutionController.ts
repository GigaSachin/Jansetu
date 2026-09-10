import { Response, NextFunction } from 'express';
import { InstitutionService } from '../services/institutionService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export class InstitutionController {
  public static async getInstitutions(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { district, domain, type, search } = req.query;
      const institutions = await InstitutionService.getInstitutions({
        district: district as string,
        domain: domain as string,
        type: type as string,
        search: search as string
      });
      sendSuccess(res, institutions, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getInstitutionById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const inst = await InstitutionService.getInstitutionById(req.params.id);
      if (!inst) {
        sendError(res, 'INSTITUTION_NOT_FOUND', `Institution with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, inst, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getDistricts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const districts = InstitutionService.getDistricts();
      sendSuccess(res, districts, 200);
    } catch (error) {
      next(error);
    }
  }
}
