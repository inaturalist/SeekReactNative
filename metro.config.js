const {getDefaultConfig, mergeConfig} = require( "@react-native/metro-config" );
const {
  resolver: { sourceExts }
} = getDefaultConfig();

/**
 * Metro configuration for React Native
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts:
      process.env.MOCK_MODE === "e2e"
        ? ["e2e-mock.js", ...sourceExts]
        : sourceExts,
    assetExts: [
      "tflite",
      "csv",
      "bmp",
      "gif",
      "jpg",
      "jpeg",
      "png",
      "psd",
      "svg",
      "webp",
      // Video formats
      "m4v",
      "mov",
      "mp4",
      "mpeg",
      "mpg",
      "webm",
      // Audio formats
      "aac",
      "aiff",
      "caf",
      "m4a",
      "mp3",
      "wav",
      // Document formats
      "html",
      "json",
      "pdf",
      "yaml",
      "yml",
      // Font formats
      "otf",
      "ttf",
      // Archives (virtual files)
      "zip"
    ]
  },
  transformer: {
    getTransformOptions: async () => ( {
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true
      }
    } )
  }
};

module.exports = mergeConfig( getDefaultConfig( __dirname ), config );
