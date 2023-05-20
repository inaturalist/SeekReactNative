/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: "jest",
      config: "e2e/jest.config.js",
    },
    jest: {
      setupTimeout: 120000,
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
        type: "iPhone 14 Plus",
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
  },
};
