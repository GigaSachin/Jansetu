import { Institution } from '../../types/index.js';

export interface InstitutionFilterOptions {
  district?: string;
  domain?: string;
  type?: string;
  search?: string;
}

export interface IInstitutionRepository {
  findAll(filters?: InstitutionFilterOptions): Promise<Institution[]>;
  findById(id: string): Promise<Institution | null>;
  create(institution: Institution): Promise<Institution>;
}
