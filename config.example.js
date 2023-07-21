// Copy this file to config.js and fill out the secret
export default {
  jwtSecret: "JWT_SECRET_FOR_SIGNING_ANONYMOUS_TOKENS",
  appId: "SEEK_APP_ID_FOR_LOGIN",
  appSecret: "SEEK_APP_SECRET_FOR_LOGIN",
  redirectURI: "SEEK_APP_REDIRECT_URI",
  // Model file names for Android and iOS
  ANDROID_MODEL_FILE_NAME: "small_inception_tf1.tflite",
  ANDROID_TAXONOMY_FILE_NAME: "small_export_tax.csv",
  IOS_MODEL_FILE_NAME: "small_inception_tf1.mlmodel",
  IOS_TAXONOMY_FILE_NAME: "small_export_tax.json"
};
