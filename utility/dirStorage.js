import { Platform } from "react-native";
import RNFS from "react-native-fs";

export const dirHome = Platform.select( {
  ios: `${RNFS.DocumentDirectoryPath}/Seek`,
  android: `${RNFS.ExternalStorageDirectoryPath}/Seek`
} );

export const dirPictures = `${dirHome}/Pictures`;
