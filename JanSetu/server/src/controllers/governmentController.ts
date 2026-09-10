import { Response, NextFunction } from 'express';
import { GovernmentService } from '../services/governmentService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export class GovernmentController {
  public static async getProblems(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { district, status } = req.query;
      const effectiveDistrict = (district as string) || req.user?.district;
      const problems = await GovernmentService.getGovernmentProblems(effectiveDistrict, status as string);
      sendSuccess(res, problems, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async verifyProblem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { notes, prioritySeverity } = req.body;
      const officerName = req.user?.name || 'Authority Officer';

      const updated = await GovernmentService.verifyProblem(req.params.id, officerName, notes, prioritySeverity);
      if (!updated) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, notes } = req.body;
      if (!status) {
        sendError(res, 'VALIDATION_ERROR', 'Status is required.', 400);
        return;
      }
      const officerName = req.user?.name || 'Authority Officer';

      const updated = await GovernmentService.updateStatus(req.params.id, status, officerName, notes);
      if (!updated) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  }
}
