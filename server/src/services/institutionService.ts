import { repositoryFactory } from '../repositories/RepositoryFactory.js';
import { Institution } from '../types/index.js';
import { JHARKHAND_DISTRICTS } from '../database/seedData.js';

export class InstitutionService {
  public static async getInstitutions(filters?: { district?: string; domain?: string; type?: string; search?: string }): Promise<Institution[]> {
    const instRepo = repositoryFactory.getInstitutionRepository();
    return instRepo.findAll(filters);
  }

  public static async getInstitutionById(id: string): Promise<Institution | null> {
    const instRepo = repositoryFactory.getInstitutionRepository();
    return instRepo.findById(id);
  }

  public static getDistricts(): string[] {
    return JHARKHAND_DISTRICTS;
  }
}
