import { Response, NextFunction } from 'express';
import { CsrService } from '../services/csrService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export class CsrController {
  public static async getOpportunities(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sector, district } = req.query;
      const opportunities = await CsrService.getOpportunities(sector as string, district as string);
      sendSuccess(res, opportunities, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async expressInterest(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { companyName, supportType, commitmentAmountOrNote } = req.body;
      const company = companyName || req.user?.name || 'Industry Partner';

      const result = await CsrService.expressInterest(
        req.params.id,
        company,
        supportType || 'Funding',
        commitmentAmountOrNote
      );

      if (!result) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }

      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }
}
