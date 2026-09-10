import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  // Log sanitized error message without leaking user credentials or tokens
  const safeMessage = err?.message || 'Unknown server error';
  console.error(`💥 [API Error] ${req.method} ${req.path} -> ${safeMessage}`);

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
  
  const isProd = process.env.NODE_ENV === 'production';
  const responseMessage = (isProd && statusCode >= 500)
    ? 'Something went wrong on our end. Please try again later.'
    : (err.message || 'An unexpected error occurred.');

  sendError(res, errorCode, responseMessage, statusCode, isProd ? undefined : err.details);
}
