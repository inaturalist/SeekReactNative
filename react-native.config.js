module.exports = {

  project: {
    ios: {},
    android: {}
  },
  assets: ["./assets/fonts"],
  dependencies: {
    "react-native-inat-camera": {
      platforms: {
        android: null,
        ios: null
      }
    },
    realm: {
      platforms: {
        ios: null
      }
    },
    "react-native-open-settings": {
      platforms: {
        ios: null
      }
    }
  }
};
