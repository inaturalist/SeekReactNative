import { Platform } from "react-native";
import RNFS from "react-native-fs";

export const dirHome = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/Seek`,
  android: `${RNFS.ExternalStorageDirectoryPath}/Seek`
} );

export const dirModel = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/optimized_model.mlmodelc`,
  android: `${RNFS.DocumentDirectoryPath}/optimized-model.tflite`
} );

export const dirTaxonomy = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/taxonomy.json`,
  android: `${RNFS.DocumentDirectoryPath}/taxonomy.csv`
} );

export const dirDebugLogs = Platform.select( {
  android: `${RNFS.ExternalCachesDirectoryPath}/debug-seek.log`
} );

export const dirPictures = `${dirHome}/Pictures`;
