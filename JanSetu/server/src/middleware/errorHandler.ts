import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error('💥 [Server Error]:', err);

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred.';

  sendError(res, errorCode, message, statusCode, err.details);
}
