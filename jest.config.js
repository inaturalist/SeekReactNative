module.exports = {
  verbose: true,
  preset: "react-native",
  setupFiles: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native-community|react-native|react-navigation|@react-navigation/.*))"
  ]
};
