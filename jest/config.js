module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js?(x)'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'dist',
    'stories'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  rootDir: '../',
  setupFiles: [
    '<rootDir>/jest/setup.js'
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.js?(x)'
  ],
  verbose: true
}
