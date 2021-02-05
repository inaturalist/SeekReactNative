// @flow

import CameraRoll from "@react-native-community/cameraroll";
import type { GetPhotosParams } from "@react-native-community/cameraroll";

const setGalleryFetchOptions = ( album: ?string, lastCursor: ?string ) => {
  const options: GetPhotosParams = {
    first: 28,
    assetType: "Photos",
    groupTypes: ( album === null ) ? "All" : "Album",
    include: ["location"]
  };

  if ( album ) { // append for cases where album isn't null
    options.groupName = album;
  }

  if ( lastCursor ) {
    options.after = lastCursor;
  }

  return options;
};

const fetchGalleryPhotos = async ( album: ?string, lastCursor: ?string ) => {
  const options = setGalleryFetchOptions( album, lastCursor );

  const photos = await CameraRoll.getPhotos( options );
  return photos;
};

export {
  fetchGalleryPhotos
};
