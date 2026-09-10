import { IUserRepository } from '../interfaces/IUserRepository.js';
import { User } from '../../types/index.js';
import { getInitialDemoUsers } from '../../database/seedData.js';

export class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    const seedUsers = getInitialDemoUsers();
    for (const u of seedUsers) {
      this.users.set(u.id, u);
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const norm = email.toLowerCase().trim();
    for (const u of this.users.values()) {
      if (u.email.toLowerCase().trim() === norm) {
        return u;
      }
    }
    return null;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const existing = this.users.get(id);
    if (!existing) return null;
    const updated: User = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.users.set(id, updated);
    return updated;
  }

  async list(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}
