/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.{ts|tsx}?$': [
      'ts-jest',
      {
        tsConfig: './tsconfig.json'
      }
    ]
  },
  moduleNameMapper: {
    // '@components/(.*)': '<rootDir>/src/components/$1',
    // '@utils/(.*)': '<rootDir>/src/utils/$1',
    // '@config/(.*)': '<rootDir>/src/config/$1',
    // '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    // '@context/(.*)': '<rootDir>/src/context/$1',
    // '@db/(.*)': '<rootDir>/src/db/$1'
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
}
