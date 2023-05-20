/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const defaultSourceExts =
  require( "metro-config/src/defaults/defaults" ).sourceExts;

module.exports = {
  resolver: {
    sourceExts:
      process.env.MOCK_MODE === "e2e"
        ? ["e2e-mock.js", ...defaultSourceExts]
        : defaultSourceExts,
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
