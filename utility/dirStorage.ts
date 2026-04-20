import { Platform } from "react-native";
import { DocumentDirectoryPath, MainBundlePath } from "@dr.pogodin/react-native-fs";

import modelFiles from "../constants/modelFileNames";

export const dirHome: string = Platform.select( {
  ios: `${DocumentDirectoryPath}/Seek`,
  android: `${DocumentDirectoryPath}/Seek`, // start using internal storage
} );

export const dirModel: string = Platform.select( {
  ios: `${MainBundlePath}/${modelFiles.IOSMODEL}`,
  android: `${DocumentDirectoryPath}/${modelFiles.ANDROIDMODEL}`,
} );

export const dirGeomodel: string = Platform.select( {
  ios: `${MainBundlePath}/${modelFiles.IOSGEOMODEL}`,
  android: `${DocumentDirectoryPath}/${modelFiles.ANDROIDGEOMODEL}`,
} );

export const dirTaxonomy: string = Platform.select( {
  ios: `${MainBundlePath}/${modelFiles.IOSTAXONOMY}`,
  android: `${DocumentDirectoryPath}/${modelFiles.ANDROIDTAXONOMY}`,
} );

export const fileNameLogs = "seek-log.txt";
export const dirLogs: string = Platform.select( {
  ios: `${DocumentDirectoryPath}`,
  android: `${DocumentDirectoryPath}`,
} );
export const pathLogs = `${dirLogs}/${fileNameLogs}`;

export const dirPictures: string = Platform.select( {
  ios: `${dirHome}/Pictures`,
  android: `${dirHome}/SeekPictures`,
} );

export const dirPhotosForUpload: string = Platform.select( {
  ios: `${DocumentDirectoryPath}/SeekUploads`,
  android: `${DocumentDirectoryPath}/SeekUploads`,
} );
