module.exports = {
  testEnvironment: "jsdom",

  preset: "ts-jest",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx,js,jsx}"],

  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/index.tsx",
    "!**/node_modules/**",
  ],

  setupFilesAfterEnv: [
    // Importing '@testing-library/jest-dom' provides useful custom matchers for
    // asserting on DOM elements in your tests. These matchers enhance the
    // readability and expressiveness of your test assertions.
    "<rootDir>/jest.setup.ts",
    "<rootDir>/src/tests/mocks/ContextMocks.ts",
  ],

  // Instructing jest to use identity-obj-proxy for any import statement
  // that ends with .jpg, .jpeg, .png, .gif, .webp, .svg, .css, .less, .scss, or .sass
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // Transforms files before running tests
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
};
