import type { Config } from "jest";

const config: Config = {
  preset: "react-native",
  moduleNameMapper: {
    // commonNames dicts are gitignored; CI has no utility/commonNames/index
    "^\\.\\./utility/commonNames$": "<rootDir>/tests/mocks/commonNames.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|@react-native-community|@react-navigation|i18n-js|@realm|uuid|@shopify/flash-list)",
  ],
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "<rootDir>/tests/worklets.setup.js",
    "<rootDir>/tests/jest.setup.js",
  ],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.post-setup.js"],
};

export default config;
