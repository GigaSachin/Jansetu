import { Database } from '../database/connection.js';
import { IUserRepository } from './interfaces/IUserRepository.js';
import { IProblemRepository } from './interfaces/IProblemRepository.js';
import { IInstitutionRepository } from './interfaces/IInstitutionRepository.js';
import { IAiAnalysisRepository } from './interfaces/IAiAnalysisRepository.js';
import { INotificationRepository } from './interfaces/INotificationRepository.js';

import { MockUserRepository } from './mock/MockUserRepository.js';
import { MockProblemRepository } from './mock/MockProblemRepository.js';
import { MockInstitutionRepository } from './mock/MockInstitutionRepository.js';
import { MockAiAnalysisRepository } from './mock/MockAiAnalysisRepository.js';
import { MockNotificationRepository } from './mock/MockNotificationRepository.js';

import { PostgresUserRepository } from './postgres/PostgresUserRepository.js';
import { PostgresProblemRepository } from './postgres/PostgresProblemRepository.js';
import { PostgresInstitutionRepository } from './postgres/PostgresInstitutionRepository.js';
import { PostgresAiAnalysisRepository } from './postgres/PostgresAiAnalysisRepository.js';
import { PostgresNotificationRepository } from './postgres/PostgresNotificationRepository.js';

class RepositoryContainer {
  private userRepo!: IUserRepository;
  private problemRepo!: IProblemRepository;
  private institutionRepo!: IInstitutionRepository;
  private aiAnalysisRepo!: IAiAnalysisRepository;
  private notificationRepo!: INotificationRepository;

  private isInitialized = false;

  public async initialize(): Promise<void> {
    const isPostgresReady = await Database.testConnection();

    if (isPostgresReady) {
      console.log('📦 [RepositoryFactory]: Initializing PostgreSQL Repositories.');
      this.userRepo = new PostgresUserRepository();
      this.problemRepo = new PostgresProblemRepository();
      this.institutionRepo = new PostgresInstitutionRepository();
      this.aiAnalysisRepo = new PostgresAiAnalysisRepository();
      this.notificationRepo = new PostgresNotificationRepository();
    } else {
      console.log('📦 [RepositoryFactory]: Initializing In-Memory Fallback Repositories with Jharkhand Seed Data.');
      this.userRepo = new MockUserRepository();
      this.problemRepo = new MockProblemRepository();
      this.institutionRepo = new MockInstitutionRepository();
      this.aiAnalysisRepo = new MockAiAnalysisRepository();
      this.notificationRepo = new MockNotificationRepository();
    }

    this.isInitialized = true;
  }

  public getUserRepository(): IUserRepository {
    this.ensureInitialized();
    return this.userRepo;
  }

  public getProblemRepository(): IProblemRepository {
    this.ensureInitialized();
    return this.problemRepo;
  }

  public getInstitutionRepository(): IInstitutionRepository {
    this.ensureInitialized();
    return this.institutionRepo;
  }

  public getAiAnalysisRepository(): IAiAnalysisRepository {
    this.ensureInitialized();
    return this.aiAnalysisRepo;
  }

  public getNotificationRepository(): INotificationRepository {
    this.ensureInitialized();
    return this.notificationRepo;
  }

  private ensureInitialized() {
    if (!this.isInitialized) {
      // Synchronous fallback init with Mock repos until async initialize completes
      this.userRepo = this.userRepo || new MockUserRepository();
      this.problemRepo = this.problemRepo || new MockProblemRepository();
      this.institutionRepo = this.institutionRepo || new MockInstitutionRepository();
      this.aiAnalysisRepo = this.aiAnalysisRepo || new MockAiAnalysisRepository();
      this.notificationRepo = this.notificationRepo || new MockNotificationRepository();
    }
  }
}

export const repositoryFactory = new RepositoryContainer();
