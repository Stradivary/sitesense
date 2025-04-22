import axios from 'axios';
import { Lead } from '@/domain/entities/lead';
import { LeadRepository } from '@/domain/repositories/lead-repository';
import { env } from '../config/env';
import { SalesforceError } from '../errors/salesforce-error';

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  token_type: string;
}

export class SalesforceLeadRepository implements LeadRepository {
  private static token: string | null = null;

  private static async getAccessToken(): Promise<string> {
    if (this.token) return this.token;

    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: env.SALESFORCE_CLIENT_ID,
      client_secret: env.SALESFORCE_CLIENT_SECRET,
      username: env.SALESFORCE_USERNAME,
      password: env.SALESFORCE_PASSWORD,
    });
    
    try {
      const response = await axios.post<SalesforceAuthResponse>(
        `${env.SALESFORCE_AUTH_URL}`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.token = response.data.access_token;
      return this.token;
    } catch (error: any) {
      console.error('Salesforce Auth Error:', error.response?.data || error.message);

      const message = error.response?.data?.error_description || error.message || 'Unknown authentication error';
      throw new Error(`Failed to authenticate with Salesforce: ${message}`);
    }
  }

  async createLead(lead: Lead): Promise<void> {
    const accessToken = await SalesforceLeadRepository.getAccessToken();

    try {
      await axios.post(
        env.SALESFORCE_API_URL,
        lead,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error: any) {
      const status = error.response?.status || 500;
      const raw = error.response?.data;
      const message = typeof raw === 'string' ? raw : raw?.[0]?.message || 'Unknown error';
      console.error('Error creating lead:', message);
      console.error('Salesforce Raw Error:', raw); 
      throw new SalesforceError(
        SalesforceError.getErrorMessage(status),
        status,
      );
    }
  }
}