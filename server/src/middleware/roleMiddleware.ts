import { Response, NextFunction } from 'express';
import { UserRole } from '../types/index.js';
import { AuthenticatedRequest } from './authMiddleware.js';
import { sendError } from '../utils/responseHelper.js';

export function authorizeRole(allowedRoles: (UserRole | string)[]) {
  const normalizedAllowed = new Set(
    allowedRoles.map(r => {
      const u = r.toUpperCase().trim();
      if (u === 'CSR' || u === 'INDUSTRY') return 'INDUSTRY_CSR';
      if (u === 'GOVT') return 'GOVERNMENT';
      if (u === 'ACADEMIA') return 'UNIVERSITY';
      return u;
    })
  );

  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'UNAUTHORIZED', 'Authentication token required for this action.', 401);
      return;
    }

    const userRoleRaw = req.user.role ? req.user.role.toUpperCase().trim() : 'CITIZEN';
    const userRoleNormalized = (userRoleRaw === 'CSR' || userRoleRaw === 'INDUSTRY') 
      ? 'INDUSTRY_CSR' 
      : (userRoleRaw === 'GOVT' ? 'GOVERNMENT' : userRoleRaw);

    if (!normalizedAllowed.has(userRoleNormalized)) {
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
