# Seek App Version 2.x

[Seek](https://www.inaturalist.org/pages/seek_app) is an app for identifying plants and animals. It is available on iOS and Android.

## Installation
1. Make sure you're running the Node version specified in `.nvmrc`. Realm only works with certain versions of Node, so you will need this for local data storage.
2. Install dependencies with `npm install`
3. If building for iOS, run `npx pod-install` from within the `ios` directory.

## Setup files
1. Go to `android/app/src/main/res/values` and rename `config.xml.example` to `config.xml` (and change its values to match your API keys)
2. Rename `config.example.js` to `config.js` and change the JWT secret.
3. Add AR Camera model and taxonomy files.
    1. The sample model files are available in this [`small_model.zip`](https://github.com/inaturalist/SeekReactNative/releases/tag/v2.9.1-138) file.
    2. On Android, these files are named `small_inception_tf1.tflite` and `small_export_tax.csv`. Create a camera folder within Android assets (i.e. `android/app/src/main/assets/camera`) and place the files there. 
    3. On iOS, these files are named `small_inception_tf1.mlmodel` and `small_export_tax.json` and should be added to the Resources folder in XCode.
4. Add files to `utility/commonNames` to allow the AR camera to load common names in localized languages. The latest files are attached assets named `commonNames.tar.gz` in the [latest Seek release page](https://github.com/inaturalist/SeekReactNative/releases).
5. For Fastlane, add `.env` file and corresponding JSON_KEY_ANDROID file, following example in `.env.example`.
6. Add `local.properties` file to `android` folder with correct sdk path to build on an Android device.

## Run build
1. Run `npm start`
2. Build locally to a device or simulator by running `npm run ios` or `npm run android`

## Manual Linking
Most third-party libraries use autolinking as of [React Native 0.60.0](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked). Any exceptions are listed in the `react-native.config.js` file. Currently, [react-native-inat-camera](https://github.com/inaturalist/react-native-inat-camera) on Android is manually linked.

## Troubleshooting
1. One common issue in React Native involves libraries not being found by the bundler. If this happens, try `npx react-native clean-project` to clear caches and reinstall node_modules and pods.

## Translations
We do our translations on Crowdin. Head over to https://crowdin.com/project/seek and create an account, and you can start suggesting translations there. We regularly export translations from Crowdin and import them to this project.

## Adding New Locales
1. Import translation files into `i18n.js`.
2. Add localized names to `utility/dictionaries/languageDict.js` for users to be able to choose a locale in settings.
3. Import languages in `utility/dateHelpers.js` so date strings can be correctly translated.
4. Use staging to add new locales to `seek_common_names.rb`.
5. Generate a compressed `commonNames.tar.gz` directory via staging and copy it to your local machine
6. Spot check that common name translations look correct, then overwrite existing files in `utility/commonNames`.
7. If needed, load additional files via `addCommonNamesFromFile` function in `utility/commonNamesHelpers.js`.
