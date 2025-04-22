import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// Load Next.js config and env
const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  clearMocks: true,

  // Coverage Settings
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/presentation/components/atoms/**',
    '!src/**/node_modules/**',
  ],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/presentation/components/atoms/",
    "/src/locale/",
    "/src/presentation/utils/i18n/",
    "/src/app/\\[locale\\]/",
    "/src/domain/",
    "src/infrastructure/config/"
  ],
  
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/presentation/components/atoms/",
    "/src/locale/",
    "/src/presentation/utils/i18n/",
    "/src/app/\\[locale\\]/",
    "/src/domain/",
    "src/infrastructure/config"
  ],

  // Environment
  testEnvironment: 'jsdom',

  // Module alias (support for @/)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // TypeScript + ESM Transform
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
      useESM: true,
    }],
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  transformIgnorePatterns: [
    '/node_modules/(?!(next|next-intl|@radix-ui|uuid|lucide-react|react-hook-form)/)',
  ],

  // Setup file
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
};

export default createJestConfig(config);
