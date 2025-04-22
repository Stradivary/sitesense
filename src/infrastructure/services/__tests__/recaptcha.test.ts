import { verifyRecaptcha } from './../recaptcha';

describe('verifyRecaptcha', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clear module cache
    process.env = { ...originalEnv, RECAPTCHA_SECRET_KEY: 'mock-secret' };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('returns true when verification is successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }) as jest.Mock;

    const result = await verifyRecaptcha('mock-token');
    expect(result).toBe(true);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.google.com/recaptcha/api/siteverify',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: expect.stringContaining('secret=mock-secret'),
      })
    );
  });

  it('returns false when verification fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    }) as jest.Mock;

    const result = await verifyRecaptcha('invalid-token');
    expect(result).toBe(false);
  });

  it('throws error if response is not OK', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    await expect(verifyRecaptcha('mock-token')).rejects.toThrow(
      'Failed to verify reCAPTCHA'
    );
  });
});
