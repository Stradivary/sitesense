import robots from './robots'; // Sesuaikan dengan path file robots.ts

jest.mock('next', () => ({
  MetadataRoute: {
    Robots: jest.fn(),
  },
}));

describe('robots function', () => {
  it('should return the correct robots metadata with the default base URL', () => {
    // Mock process.env.NEXT_PUBLIC_APP_URL to be undefined
    delete process.env.NEXT_PUBLIC_APP_URL;

    const result = robots();

    // Check that the result is an object with the correct values
    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'http://localhost:3000/sitemap.xml', // default base URL
    });
  });

  it('should return the correct robots metadata with a custom base URL', () => {
    // Set a mock value for NEXT_PUBLIC_APP_URL
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    const result = robots();

    // Check that the result uses the custom base URL
    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://example.com/sitemap.xml', // custom base URL
    });
  });
});
