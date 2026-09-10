import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper.js';
import { JHARKHAND_DISTRICTS } from '../database/seedData.js';

export function validateProblemCreation(req: Request, res: Response, next: NextFunction): void {
  const { title, description, category, district, state } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    sendError(res, 'VALIDATION_ERROR', 'Title is required and must be at least 5 characters.', 400);
    return;
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    sendError(res, 'VALIDATION_ERROR', 'Description is required and must be at least 10 characters.', 400);
    return;
  }

  if (!category || typeof category !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'Category is required.', 400);
    return;
  }

  if (!district || typeof district !== 'string') {
    sendError(res, 'VALIDATION_ERROR', 'District is required.', 400);
    return;
  }

  if (state && typeof state === 'string' && state.toLowerCase() !== 'jharkhand') {
    // Default or permit other states, but enforce non-empty string
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

  if (!email || !password) {
    sendError(res, 'VALIDATION_ERROR', 'Email and password are required.', 400);
    return;
  }

  next();
}
