// @flow

import CameraRoll from "@react-native-community/cameraroll";

const setGalleryFetchOptions = ( album, lastCursor ) => {
  const options = {
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

const fetchGalleryPhotos = async ( album, lastCursor ) => {
  const options = setGalleryFetchOptions( album, lastCursor );

  const photos = await CameraRoll.getPhotos( options );
  return photos;
};

export {
  fetchGalleryPhotos
};
