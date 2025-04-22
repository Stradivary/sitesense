
import { env } from '../config/env';

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  token_type: string;
}

export class SalesforceAuth {
  private static token: string | null = null;

  static async getAccessToken(): Promise<string> {
    if (this.token) return this.token;

    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: env.SALESFORCE_CLIENT_ID,
      client_secret: env.SALESFORCE_CLIENT_SECRET,
      username: env.SALESFORCE_USERNAME,
      password: env.SALESFORCE_PASSWORD,
    });
 

    const response = await fetch(`${env.SALESFORCE_AUTH_URL}?${params}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Salesforce');
    }

    const data = await response.json() as SalesforceAuthResponse;
    this.token = data.access_token;
    return this.token;
  }
}
