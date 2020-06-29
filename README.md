# Seek App Version 2.0

Seek is an app built for iOS and Android. 

## Setup

1. Make sure you're running the latest version of Node v10.X.
2. Install dependences with `npm install`
3. If building for iOS, run `pod install` from within the `ios` directory.
4. Run `npm start`
5. This project uses a macOS `security` tool to store keystore passwords. If building for Android on Windows or Linux, replace the implementation of `getPassword()` in `app/build.gradle` with a hardcoded string.
6. Build locally to a device or simulator by running `react-native run-ios` or `react-native run-android`
7. Go to `android/app/src/main/res/values` and rename `config.xml.example` to `config.xml` (and change its values to match your API keys)
8. Rename `config.example.js` to `config.js` and change the JWT secret.
9. Add AR Camera model files to the project. On Android, these files are named `optimized_model.tflite` and `taxonomy_data.csv`, and they should be placed in a camera folder within Android assets (i.e. `android/app/src/main/assets/camera`). On iOS, these files are named `optimized_model.mlmodel` and `taxonomy.json` and should be added to the Resources folder in XCode. 
10. Add common names files to `Seek/utility/commonNames` to allow the AR camera to load common names in localized languages. These files are titled `commonNamesDict-0.js` to `commonNamesDict-9.js`.

## Manual Linking
Most third-party libraries use autolinking as of [React Native 0.60.0](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked). There is one exception, which is listed in the [react-native.config.js](https://github.com/inaturalist/SeekReactNative/blob/master/react-native.config.js) file. 

1. [react-native-inat-camera](https://github.com/inaturalist/react-native-inat-camera) on Android is manually linked.

## Troubleshooting

1. Third-party libraries in React Native often use linking. All libraries in this project have already been linked, but if this setup isn't working on your local machine, it's possible that the links are broken. You can run `react-native link` followed by the name of the missing library, but be aware that this will likely cause duplicate project references in the Android gradle. If the issue is only happening on iOS, you can use XCode to go into Seek > Build Phases > Link Binary With Libraries and check that the libraries are linked correctly. 
2. Another common issue in React Native involves libraries not being found by the bundler. If this happens, you will likely see an error message that tells you to clear the cache using the following steps: 
  * Clear watchman: `watchman watch-del-all`
  * Delete and reinstall node_modules: `rm -rf node_modules && npm install`
  * Reset the bundler cache: `npm start -- --reset-cache`
3. Cleaning the project can also help with some build issues. To do this on Android, run `./gradlew clean` from within the `android` directory. For iOS, use XCode > Product > Clean Build Folder.

## Translations
We do our translations on Crowdin. Head over to https://crowdin.com/project/seek and create an account, and you can start suggesting translations there. We regularly export translations from Crowdin and import them to this project.
