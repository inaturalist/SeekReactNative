// @flow

import { Platform } from "react-native";
import RNFS from "react-native-fs";

export const dirHome: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/Seek`,
  android: `${RNFS.DocumentDirectoryPath}/Seek` // start using internal storage
} );

export const dirModel: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/optimized_model.mlmodelc`,
  android: `${RNFS.DocumentDirectoryPath}/optimized-model.tflite`
} );

export const dirTaxonomy: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/taxonomy.json`,
  android: `${RNFS.DocumentDirectoryPath}/taxonomy.csv`
} );

export const dirDebugLogs: string = Platform.select( {
  android: `${RNFS.ExternalCachesDirectoryPath}/debug-seek.log`
} );

export const dirPictures: string = Platform.select( {
  ios: `${dirHome}/Pictures`,
  android: `${dirHome}/SeekPictures`
} );
