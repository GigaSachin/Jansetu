import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { User, UserRole, UserSanitized, AuthTokenPayload } from '../types/index.js';
import { hashPassword, comparePassword } from '../utils/passwordHelper.js';

export interface RegisterDTO {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole | string;
  district: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  public static normalizeRole(roleStr: string): UserRole {
    const r = roleStr.toUpperCase().trim();
    if (r === 'GOVERNMENT' || r === 'GOVT') return 'GOVERNMENT';
    if (r === 'UNIVERSITY' || r === 'ACADEMIA') return 'UNIVERSITY';
    if (r === 'INDUSTRY' || r === 'INDUSTRY_CSR' || r === 'CSR') return 'INDUSTRY_CSR';
    return 'CITIZEN';
  }

  public static sanitizeUser(user: User): UserSanitized {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      district: user.district,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  public static generateToken(user: User): string {
    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      district: user.district
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as any
    });
  }

  public static async register(data: RegisterDTO): Promise<{ user: UserSanitized; token: string }> {
    const userRepo = repositoryFactory.getUserRepository();

    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
      throw { code: 'USER_EXISTS', message: 'An account with this email already exists.', status: 409 };
    }

    const password_hash = await hashPassword(data.password);
    const now = new Date().toISOString();
    const role = this.normalizeRole(data.role);

    const newUser: User = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name,
      email: data.email.toLowerCase().trim(),
      phone: data.phone,
      password_hash,
      role,
      district: data.district,
      created_at: now,
      updated_at: now
    };

    const saved = await userRepo.create(newUser);
    const token = this.generateToken(saved);

    return {
      user: this.sanitizeUser(saved),
      token
    };
  }

  public static async login(data: LoginDTO): Promise<{ user: UserSanitized; token: string }> {
    const userRepo = repositoryFactory.getUserRepository();

    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.', status: 401 };
    }

    const isValid = await comparePassword(data.password, user.password_hash);
    if (!isValid) {
      throw { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.', status: 401 };
    }

    const token = this.generateToken(user);
    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  public static async getMe(userId: string): Promise<UserSanitized> {
    const userRepo = repositoryFactory.getUserRepository();
    const user = await userRepo.findById(userId);
    if (!user) {
      throw { code: 'USER_NOT_FOUND', message: 'User not found.', status: 404 };
    }
    return this.sanitizeUser(user);
  }
}
