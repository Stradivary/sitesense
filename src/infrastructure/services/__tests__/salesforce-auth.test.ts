import { SalesforceAuth } from './../salesforce-auth';

jest.mock('../../config/env', () => ({
  env: {
    SALESFORCE_CLIENT_ID: 'mock-client-id',
    SALESFORCE_CLIENT_SECRET: 'mock-client-secret',
    SALESFORCE_USERNAME: 'mock-user',
    SALESFORCE_PASSWORD: 'mock-password',
    SALESFORCE_AUTH_URL: 'https://mock.salesforce.com/auth',
  },
}));

describe('SalesforceAuth', () => {
  const mockToken = 'mock-access-token';

  beforeEach(() => {
    // Reset static token value
    (SalesforceAuth as any).token = null;
    jest.restoreAllMocks();
  });

  it('should fetch and return access token on first call', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        access_token: mockToken,
        instance_url: 'mock-instance',
        token_type: 'Bearer',
      }),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse as any);

    const token = await SalesforceAuth.getAccessToken();

    expect(token).toBe(mockToken);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://mock.salesforce.com/auth?'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('should return cached token on subsequent calls', async () => {
    // Set token manually to simulate cache
    (SalesforceAuth as any).token = mockToken;

    const token = await SalesforceAuth.getAccessToken();

    expect(token).toBe(mockToken);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should throw error when fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
    }) as jest.Mock;

    await expect(SalesforceAuth.getAccessToken()).rejects.toThrow(
      'Failed to authenticate with Salesforce'
    );
  });
});
