// @flow

import { Platform } from "react-native";
import RNFS from "react-native-fs";

import modelFiles from "../constants/modelFileNames";

export const dirHome: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/Seek`,
  android: `${RNFS.DocumentDirectoryPath}/Seek` // start using internal storage
} );

export const dirModel: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/${modelFiles.IOSMODEL}`,
  android: `${RNFS.DocumentDirectoryPath}/${modelFiles.ANDROIDMODEL}`
} );

export const dirTaxonomy: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/${modelFiles.IOSTAXONOMY}`,
  android: `${RNFS.DocumentDirectoryPath}/${modelFiles.ANDROIDTAXONOMY}`
} );

export const dirDebugLogs: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}`,
  android: `${RNFS.ExternalCachesDirectoryPath}/debug-seek.log`
} );

export const dirPictures: string = Platform.select( {
  ios: `${dirHome}/Pictures`,
  android: `${dirHome}/SeekPictures`
} );

export const dirPhotosForUpload: string = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/SeekUploads`,
  android: `${RNFS.DocumentDirectoryPath}/SeekUploads`
} );
