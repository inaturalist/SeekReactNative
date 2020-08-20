module.exports = {
  // verbose: true,
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  setupFiles: ["<rootDir>/jest.setup.js"]
  // transformIgnorePatterns: [
  //   "node_modules/(?!(@react-native-community|react-native|react-navigation|@react-navigation/.*))"
  // ],
  // transform: {
  //   "^.+\\.[t|j]sx?$": "babel-jest"
  // }
};
