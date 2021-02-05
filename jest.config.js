module.exports = {
  // verbose: true,
  moduleDirectories: [
    "node_modules",
    "<rootDir>/utility"
  ],
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native-community|@react-native-picker)"
  ]
  // transformIgnorePatterns: [
  //   "node_modules/(?!(@react-native-community|react-native|react-navigation|@react-navigation/.*))"
  // ],
  // transform: {
  //   "^.+\\.[t|j]sx?$": "babel-jest"
  // }
};
