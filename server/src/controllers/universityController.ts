import { Response, NextFunction } from 'express';
import { UniversityService } from '../services/universityService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export class UniversityController {
  public static async getChallenges(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { domain, district } = req.query;
      const challenges = await UniversityService.getChallenges(domain as string, district as string);
      sendSuccess(res, challenges, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getMatches(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const institutionId = (req.query.institutionId as string) || req.user?.name || 'inst-bit-mesra';
      const matches = await UniversityService.getMatchesForInstitution(institutionId);
      sendSuccess(res, matches, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async expressInterest(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { institutionName, proposalNotes } = req.body;
      const teamLead = req.user?.name || 'Academic Lead';
      const instName = institutionName || 'Jharkhand HEI Consortium';

      const result = await UniversityService.expressInterest(req.params.id, instName, teamLead, proposalNotes);
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
