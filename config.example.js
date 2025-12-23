// Copy this file to config.js and fill out the secret
export default {
  jwtSecret: "JWT_SECRET_FOR_SIGNING_ANONYMOUS_TOKENS",
  appId: "SEEK_APP_ID_FOR_LOGIN",
  appSecret: "SEEK_APP_SECRET_FOR_LOGIN",
  redirectURI: "SEEK_APP_REDIRECT_URI",
  // Model file names for Android and iOS
  ANDROID_MODEL_FILE_NAME: "INatVision_Small_2_fact256_8bit.tflite",
  ANDROID_GEOMODEL_FILE_NAME: "INatGeomodel_Small_2_8bit.tflite",
  ANDROID_TAXONOMY_FILE_NAME: "taxonomy.csv",
  IOS_MODEL_FILE_NAME: "optimized_model_v2_20.mlmodel",
  IOS_GEOMODEL_FILE_NAME: "geomodel_v2_20.mlmodel",
  IOS_TAXONOMY_FILE_NAME: "taxonomy_v2_20.json",
};
