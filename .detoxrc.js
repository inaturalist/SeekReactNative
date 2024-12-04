/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: "jest",
      config: "e2e/jest.config.js",
    },
    jest: {
      setupTimeout: 900000,
      teardownTimeout: 900000,
    },
  },
  apps: {
    "ios.debug": {
      type: "ios.app",
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/Seek.app",
      build:
        "export MOCK_MODE=e2e && xcodebuild -workspace ios/Seek.xcworkspace -scheme Seek -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build && unset MOCK_MODE",
    },
    "ios.release": {
      type: "ios.app",
      binaryPath: "ios/build/Build/Products/Release-iphonesimulator/Seek.app",
      build:
        "export MOCK_MODE=e2e && xcodebuild -workspace ios/Seek.xcworkspace -scheme Seek -configuration Release -sdk iphonesimulator -derivedDataPath ios/build && unset MOCK_MODE",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 15 Pro",
      },
    },
  },
  configurations: {
    "ios.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "ios.release": {
      device: "simulator",
      app: "ios.release",
    },
  },
};
