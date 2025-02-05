# Seek App Version 2.x

[Seek](https://www.inaturalist.org/pages/seek_app) is an app for identifying plants and animals. It is available on iOS and Android., if you'd like to help out, please see [CONTRIBUTING](https://github.com/inaturalist/SeekReactNative/blob/main/CONTRIBUTING.md).

## Requirements
* [Android and iOS environment setup](https://reactnative.dev/docs/environment-setup) described in the RN docs
* [Android NDK and cmake setup](https://developer.android.com/studio/projects/install-ndk) described in the Android developer docs
## Installation
1. Make sure you're running the Node version specified in `.nvmrc`. Realm only works with certain versions of Node, so you will need this for local data storage.
2. Install dependencies with `npm install`
3. If building for iOS, run `npx pod-install` from within the `ios` directory.

## Setup files
1. Go to `android/app/src/main/res/values` and rename `config.example.xml` to `config.xml` (and change its values to match your API keys)
2. Rename `config.example.js` to `config.js` and change the JWT secret.
3. Add AR Camera model and taxonomy files.
    1. Add the example model files by executing `npm run add-example-model`. If that does not work continue with the next steps.
    1. If the download script fails: The sample model files are available in the latest release in this [`repository`](https://github.com/inaturalist/model-files).
    1. On Android, these files are named `INatVision_Small_2_fact256_8bit.tflite`, `INatGeomodel_Small_2_8bit.tflite` and `taxonomy.csv`. Create a camera folder within Android assets (i.e. `android/app/src/debug/assets/camera`) and place the files there.
    1. On iOS, these files are named `smallINatVision_Small_2_fact256_8bit.mlmodel`, `INatGeomodel_Small_2_8bit.mlmodel` and `taxonomy.json`, but need to be renamed to `optimized_model_v2_13.mlmodel`, `geomodel_v2_13.mlmodel` and `taxonomy_v2_13.json`, respectively, and should be added to the Resources folder in XCode.
    1. Unzip the common names file `commonNames.tar.gz` into `utility/commonNames` to allow the AR camera to load common names in localized languages.
    1. Copy `commonNamesIndex.example` from the utility directory to a new index.ts file into the new directory `utility/commonNames`.
5. For Fastlane, add `.env` file and corresponding JSON_KEY_ANDROID file, following example in `.env.example`.
6. Add `local.properties` file to `android` folder with correct sdk path to build on an Android device.

## Run build
1. Run `npm start`
2. Build locally to a device or simulator by running `npm run ios` or `npm run android`

## Manual Linking
Most third-party libraries use autolinking as of [React Native 0.60.0](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked). Any exceptions are listed in the `react-native.config.js` file.

## Tests
We currently have three kinds of tests:

1. `tests/integration`: Tests the integration of multiple modules, e.g. a list of observation that makes requests to a mocked API, persists the response data in local storage, retrieves the data from local storage and renders components.
2. `tests/unit`: Tests only specific modules, like a single component, or a hook.
3. `e2e`: Tests user interactions on the finished app build running on the iOS simulator (see below).

### Unit tests & integration tests
We're using [Jest](https://jestjs.io/) and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) for most of our tests.

```bash
# Run all tests
npm test
```

### E2E tests
We're using [Detox](https://wix.github.io/Detox/docs/19.x/) for E2E tests. If you want to run the e2e tests on your local machine (MacOS only), make sure you fulfill the RN development requirements, see above, and also follow the test-specific [environment setup](https://wix.github.io/Detox/docs/19.x/introduction/ios-dev-env/).

```bash
# Build the app and run the tests
npm run e2e
```

If you have built the app already for a previous test, and just want to run an updated test without changing the app code, you can run `npm run e2e:test`.

If you are running into some issues after the tests have been working for some time, try updating `applesimutils` with `brew update && brew upgrade applesimutils`.

## Troubleshooting
1. One common issue in React Native involves libraries not being found by the bundler. If this happens, try `npx react-native clean-project` to clear caches and reinstall node_modules and pods.

## Translations
We do our translations on Crowdin. Head over to https://crowdin.com/project/seek and create an account, and you can start suggesting translations there. We regularly export translations from Crowdin and import them to this project.

## Adding New Locales

When a language is at least 20% translated on Crowdin, follow these steps to enable it in the app.

1. Import translation files into `i18n.ts`.
2. Add localized names to `utility/dictionaries/languageDict.js` for users to be able to choose a locale in settings.
3. Import languages in `utility/dateHelpers.js` so date strings can be correctly translated.
4. Use staging to add new locales to `seek_common_names.rb`.
5. Generate a compressed `commonNames.tar.gz` directory via staging and copy it to your local machine
6. Spot check that common name translations look correct, then overwrite existing files in `utility/commonNames`.
7. If needed, load additional files via `addCommonNamesFromFile` function in `utility/commonNamesHelpers.js`.
