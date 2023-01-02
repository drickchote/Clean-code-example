module.exports = {
  roots: ["<rootDir>/src"],
  collectConverageFrom: ["<rootDir>/src/**/**.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transformer: {
    ".+\\.ts$": "ts-jest",
  },
};
