# Seek App Version 2.0

Seek is an app built for iOS and Android. 

## Setup

1. Install dependences with `npm install`
2. Run `npm start`
3. Build locally to a device or simulator by running `react-native run-ios` or `react-native run-android`
4. Go to `android/app/src/main/res/values` and rename `config.xml.example` to `config.xml` (and change its values to match your API keys)
5. Rename `config.example.js` to `config.js` and change the JWT secret.
6. Add AR Camera model files to the project. On Android, these files are named `optimized_model.tflite` and `taxonomy_data.csv`, and they should be placed in a camera folder within Android assets (i.e. `android/app/src/main/assets/camera`). On iOS, these files are named `optimized_model.mlmodel` and `taxonomy.json` and should be added to the Resources folder in XCode. 
7. Add 6 common names files to `Seek/utility/commonNames` to allow the AR camera to load common names in localized languages. These files are titled `commonNamesDict-0.js` to `commonNamesDict-5.js`.

## Troubleshooting

1. Third-party libraries in React Native often use linking. All libraries in this project have already been linked, but if this setup isn't working on your local machine, it's possible that the links are broken. You can run `react-native link` followed by the name of the missing library, but be aware that this will likely cause duplicate project references in the Android gradle. If the issue is only happening on iOS, you can use XCode to go into Seek > Build Phases > Link Binary With Libraries and check that the libraries are linked correctly. 
2. Another common issue in React Native involves libraries not being found by the bundler. If this happens, you will likely see an error message that tells you to clear the cache using the following steps: 
  * Clear watchman: `watchman watch-del-all`
  * Delete and reinstall node_modules: `rm -rf node_modules && npm install`
  * Reset the bundler cache: `npm start -- --reset-cache`

![Heyyyyyyyy](https://media.giphy.com/media/uNlfm6nGyFmOQ/giphy.gif)