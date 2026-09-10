import { Response, NextFunction } from 'express';
import { UserRole } from '../types/index.js';
import { AuthenticatedRequest } from './authMiddleware.js';
import { sendError } from '../utils/responseHelper.js';

export function authorizeRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'UNAUTHORIZED', 'Authentication required.', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        'FORBIDDEN',
        `Access denied. Requires one of roles: [${allowedRoles.join(', ')}]. Current role: ${req.user.role}`,
        403
      );
      return;
    }

    next();
  };
}
