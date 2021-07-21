module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: [
    'lcov',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  setupFilesAfterEnv: [
    'jest-extended',
  ],
  testEnvironment: 'node',
  verbose: true,
}
