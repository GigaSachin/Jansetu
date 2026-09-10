import { Response, NextFunction } from 'express';
import { ProblemService } from '../services/problemService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export class ProblemController {
  public static async createProblem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const citizenUser = req.user ? { id: req.user.userId, name: req.user.name } : undefined;
      const result = await ProblemService.createProblem(req.body, citizenUser);
      sendSuccess(res, result, 201);
    } catch (error) {
      next(error);
    }
  }

  public static async getProblems(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { district, category, status, severity, citizen_id, search, limit, offset } = req.query;
      const problems = await ProblemService.getProblems({
        district: district as string,
        category: category as string,
        status: status as string,
        severity: severity as string,
        citizen_id: citizen_id as string,
        search: search as string,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        offset: offset ? parseInt(offset as string, 10) : undefined
      });
      sendSuccess(res, problems, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getProblemById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const problem = await ProblemService.getProblemById(req.params.id);
      if (!problem) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, problem, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async updateProblem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await ProblemService.updateProblem(req.params.id, req.body);
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
      const changedBy = req.user?.name || 'Authorized User';
      const changedByRole = req.user?.role || 'GOVERNMENT';

      const updated = await ProblemService.updateProblemStatus(
        req.params.id,
        status,
        notes,
        changedBy,
        changedByRole
      );

      if (!updated) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }

      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getJourney(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const journey = await ProblemService.getProblemJourney(req.params.id);
      if (!journey) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, journey, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getAiAnalysis(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const aiResult = await ProblemService.getProblemAiAnalysis(req.params.id);
      if (!aiResult) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }
      sendSuccess(res, aiResult, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getMatches(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const matches = await ProblemService.getProblemMatches(req.params.id);
      sendSuccess(res, matches, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async addAttachment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fileName, fileType, fileSize, fileUrl } = req.body;
      if (!fileName || !fileUrl) {
        sendError(res, 'VALIDATION_ERROR', 'fileName and fileUrl are required.', 400);
        return;
      }

      const attachment = await ProblemService.addAttachment(req.params.id, {
        fileName,
        fileType: fileType || 'IMAGE',
        fileSize: fileSize || 1024,
        fileUrl
      });

      if (!attachment) {
        sendError(res, 'PROBLEM_NOT_FOUND', `Problem with id ${req.params.id} was not found.`, 404);
        return;
      }

      sendSuccess(res, attachment, 201);
    } catch (error) {
      next(error);
    }
  }
}
