import { IInstitutionRepository, InstitutionFilterOptions } from '../interfaces/IInstitutionRepository.js';
import { Institution } from '../../types/index.js';
import { SEED_INSTITUTIONS } from '../../database/seedData.js';

export class MockInstitutionRepository implements IInstitutionRepository {
  private institutions: Map<string, Institution> = new Map();

  constructor() {
    for (const inst of SEED_INSTITUTIONS) {
      this.institutions.set(inst.id, inst);
    }
  }

  async findAll(filters?: InstitutionFilterOptions): Promise<Institution[]> {
    let result = Array.from(this.institutions.values());

    if (filters) {
      if (filters.district) {
        result = result.filter(i => i.district.toLowerCase() === filters.district!.toLowerCase());
      }
      if (filters.type) {
        result = result.filter(i => i.type.toLowerCase().includes(filters.type!.toLowerCase()));
      }
      if (filters.domain) {
        result = result.filter(i =>
          i.domains.some(d => d.toLowerCase().includes(filters.domain!.toLowerCase()))
        );
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(i =>
          i.name.toLowerCase().includes(query) ||
          (i.short_name && i.short_name.toLowerCase().includes(query)) ||
          i.district.toLowerCase().includes(query)
        );
      }
    }

    return result;
  }

  async findById(id: string): Promise<Institution | null> {
    return this.institutions.get(id) || null;
  }

  async create(institution: Institution): Promise<Institution> {
    this.institutions.set(institution.id, institution);
    return institution;
  }
}
