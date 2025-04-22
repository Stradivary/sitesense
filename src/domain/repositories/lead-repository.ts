import { Lead } from '../entities/lead';

export interface LeadRepository {
  createLead(lead: Lead): Promise<void>;
}
