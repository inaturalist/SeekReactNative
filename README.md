# Seek App Version 2.x

[Seek](https://www.inaturalist.org/pages/seek_app) is an app for identifying plants and animals. It is available on iOS and Android.

## Installation
1. Make sure you're running the Node version specified in `.nvmrc`. Realm only works with certain versions of Node, so you will need this for local data storage.
2. Install dependences with `npm install`
3. If building for iOS, run `pod install` from within the `ios` directory.

## Setup files
1. Go to `android/app/src/main/res/values` and rename `config.xml.example` to `config.xml` (and change its values to match your API keys)
2. Rename `config.example.js` to `config.js` and change the JWT secret.
3. Add AR Camera model and taxonomy files.
    1. The sample model files are available in this [`small_model.zip`](https://github.com/inaturalist/SeekReactNative/releases/tag/v2.9.1-138) file.
    2. On Android, these files are named `small_inception_tf1.tflite` and `small_export_tax.csv`. Create a camera folder within Android assets (i.e. `android/app/src/main/assets/camera`) and place the files there. 
    3. On iOS, these files are named `small_inception_tf1.mlmodel` and `small_export_tax.json` and should be added to the Resources folder in XCode.
4. Add files to `utility/commonNames` to allow the AR camera to load common names in localized languages. The latest files are attached assets named `commonNames.tar.gz` in the [latest Seek release page](https://github.com/inaturalist/SeekReactNative/releases).

## Run build
1. Run `npm start`
2. Build locally to a device or simulator by running `npm run ios` or `npm run android`

## Manual Linking
Most third-party libraries use autolinking as of [React Native 0.60.0](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked). Any exceptions are listed in the `react-native.config.js` file. Currently, [react-native-inat-camera](https://github.com/inaturalist/react-native-inat-camera) on Android is manually linked.

## Troubleshooting
1. One common issue in React Native involves libraries not being found by the bundler. If this happens, React Native will display an error message that tells you to clear the cache using the following steps: 
    1. Clear watchman: `watchman watch-del-all`
    2. Delete and reinstall node_modules: `rm -rf node_modules && npm install`
    3. Reset the bundler cache: `npm start -- --reset-cache`
2. Cleaning the project can also help with build issues.
    1. To do this on Android, run `./gradlew clean` from within the `android` directory.
    2. For iOS, use XCode > Product > Clean Build Folder.

## Translations
We do our translations on Crowdin. Head over to https://crowdin.com/project/seek and create an account, and you can start suggesting translations there. We regularly export translations from Crowdin and import them to this project.
