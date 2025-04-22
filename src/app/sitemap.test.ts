import sitemap from './sitemap';

describe('sitemap function', () => {
  it('should return a sitemap object with the correct URL and metadata', () => {
    delete process.env.NEXT_PUBLIC_APP_URL;

    const result = sitemap();

    expect(result).toEqual([
      {
        url: 'http://localhost:3000/', 
        lastModified: expect.any(Date),
        changeFrequency: 'daily',
        priority: 0.7,
      },
    ]);
  });

  it('should return a sitemap object with the correct URL when NEXT_PUBLIC_APP_URL is set', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    const result = sitemap();

    expect(result).toEqual([
      {
        url: 'https://example.com/',
        lastModified: expect.any(Date),
        changeFrequency: 'daily',
        priority: 0.7,
      },
    ]);
  });
});
