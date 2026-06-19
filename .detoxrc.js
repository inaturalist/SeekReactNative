const fs = require( "fs" );
const { version } = require("./package.json");

// Match android/app/build.gradle's
// `base.archivesName = applicationId + "-v" + versionName + "+" + versionCode`,
// e.g. org.inaturalist.seek-v2.18.0+415. Parsed from build.gradle so it never drifts.
const buildGradle = fs.readFileSync( "./android/app/build.gradle", "utf8" );
const versionCode = buildGradle.match( /versionCode (\d+)/ )[1];
const apkFilenamePrefix = `org.inaturalist.seek-v${version}+${versionCode}`;

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
    "android.debug": {
      type: "android.apk",
      binaryPath: `android/app/build/outputs/apk/debug/${apkFilenamePrefix}-debug.apk`,
      /* eslint-disable-next-line max-len */
      testBinaryPath: `android/app/build/outputs/apk/androidTest/debug/${apkFilenamePrefix}-debug-androidTest.apk`,
      build:
        "(cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug)",
    },
    "android.release": {
      type: "android.apk",
      binaryPath: `android/app/build/outputs/apk/release/${apkFilenamePrefix}-release.apk`,
      /* eslint-disable-next-line max-len */
      testBinaryPath: `android/app/build/outputs/apk/androidTest/release/${apkFilenamePrefix}-release-androidTest.apk`,
      build:
        "(cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release)",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 17 Pro",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        // Make sure to follow the guide to setup an AOSP emulator if testing locally
        // https://wix.github.io/Detox/docs/guide/android-dev-env#android-aosp-emulators
        avdName: "Pixel_5_API_34_AOSP",
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
    "android.debug": {
      device: "emulator",
      app: "android.debug",
    },
    "android.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
