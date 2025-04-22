jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: jest.fn(() => {}),
}));

import { config } from './middleware';

describe('middleware setup', () => {
  it('should export correct matcher config', () => {
    expect(config).toEqual({
      matcher: ['/', '/(id|en)/:path*'],
    });
  });
});
