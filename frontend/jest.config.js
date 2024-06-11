module.exports = {
  testEnvironment: "jsdom",

  preset: "ts-jest",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx,js,jsx}"],

  // Configures code coverage settings
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/index.tsx",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Transforms files before running tests
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
};
