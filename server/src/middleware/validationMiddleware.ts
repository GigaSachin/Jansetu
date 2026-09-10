import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper.js';

const DISALLOWED_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'ps1', 'sh', 'vbs', 'js', 'msi', 'jar', 'scr', 'bin', 'dll', 'com', 'pif'
]);

const ALLOWED_CATEGORIES = new Set([
  'Water & Sanitation',
  'Roads & Transport',
  'Healthcare Access',
  'Education Infrastructure',
  'Agriculture & Rural',
  'Environment & Greenery',
  'Public Safety',
  'Waste Management',
  'Electricity & Lighting',
  'Accessibility & Inclusion',
  'Public Infrastructure',
  'Digital Services',
  'Women & Child Safety',
  'Other'
]);

export function validateProblemCreation(req: Request, res: Response, next: NextFunction): void {
  const { title, description, category, district, latitude, longitude, evidence } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    sendError(res, 'VALIDATION_ERROR', 'Title is required and must be at least 5 characters.', 400);
    return;
  }

  if (title.trim().length > 200) {
    sendError(res, 'VALIDATION_ERROR', 'Title must not exceed 200 characters.', 400);
    return;
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    sendError(res, 'VALIDATION_ERROR', 'Description is required and must be at least 10 characters.', 400);
    return;
  }

  if (description.trim().length > 5000) {
    sendError(res, 'VALIDATION_ERROR', 'Description must not exceed 5000 characters.', 400);
    return;
  }

  // Basic XSS check
  const dangerousPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror\s*=/i;
  if (dangerousPattern.test(title) || dangerousPattern.test(description)) {
    sendError(res, 'VALIDATION_ERROR', 'Input contains unsafe script content.', 400);
    return;
  }

  if (!category || typeof category !== 'string' || !ALLOWED_CATEGORIES.has(category.trim())) {
    sendError(res, 'VALIDATION_ERROR', `Category must be one of: [${Array.from(ALLOWED_CATEGORIES).join(', ')}]`, 400);
    return;
  }

  if (!district || typeof district !== 'string' || district.trim().length < 2) {
    sendError(res, 'VALIDATION_ERROR', 'Valid district name is required.', 400);
    return;
  }

  // Coordinate check
  if (latitude !== undefined && latitude !== null) {
    const lat = Number(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      sendError(res, 'VALIDATION_ERROR', 'Latitude must be a valid number between -90 and 90.', 400);
      return;
    }
  }

  if (longitude !== undefined && longitude !== null) {
    const lng = Number(longitude);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      sendError(res, 'VALIDATION_ERROR', 'Longitude must be a valid number between -180 and 180.', 400);
      return;
    }
  }

  // Evidence validation
  if (Array.isArray(evidence)) {
    for (const item of evidence) {
      if (item.name && typeof item.name === 'string') {
        const ext = item.name.split('.').pop()?.toLowerCase() || '';
        if (DISALLOWED_EXTENSIONS.has(ext)) {
          sendError(res, 'VALIDATION_ERROR', `File type .${ext} is forbidden for security.`, 400);
          return;
        }
      }
      if (item.size && item.size > 15 * 1024 * 1024) {
        sendError(res, 'VALIDATION_ERROR', 'Individual attachment size must not exceed 15MB.', 400);
        return;
      }
    }
  }

  next();
}

export function validateAttachment(req: Request, res: Response, next: NextFunction): void {
  const { fileName, fileSize } = req.body;

  if (!fileName || typeof fileName !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'fileName is required.', 400);
    return;
  }

  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  if (DISALLOWED_EXTENSIONS.has(ext)) {
    sendError(res, 'VALIDATION_ERROR', `File type .${ext} is forbidden for security.`, 400);
    return;
  }

  if (fileSize && typeof fileSize === 'number' && fileSize > 15 * 1024 * 1024) {
    sendError(res, 'VALIDATION_ERROR', 'File size exceeds maximum permitted 15MB limit.', 400);
    return;
  }

  next();
}

export function validateRegister(req: Request, res: Response, next: NextFunction): void {
  const { name, email, password, role, district } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    sendError(res, 'VALIDATION_ERROR', 'Name is required.', 400);
    return;
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    sendError(res, 'VALIDATION_ERROR', 'A valid email address is required.', 400);
    return;
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    sendError(res, 'VALIDATION_ERROR', 'Password must be at least 6 characters.', 400);
    return;
  }

  if (!role || typeof role !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'User role is required.', 400);
    return;
  }

  if (!district || typeof district !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'District is required.', 400);
    return;
  }

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'Email and password are required.', 400);
    return;
  }

  next();
}
