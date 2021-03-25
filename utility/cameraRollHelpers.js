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

const checkForUniquePhotos = ( seen: Set<Object>, assets: Array<Object> ) => {
  // from cameraroll example: https://github.com/react-native-cameraroll/react-native-cameraroll/blob/7fa9b7c062c166cd94e62b4ab5d1f7b5f663c9a0/example/js/CameraRollView.js#L177
  const uniqAssets: Array<Object> = assets.map( asset => {
    let value = asset.node.image.uri;
    if ( seen.has( value ) ) {
      return;
    }
    seen.add( value );
    return asset;
  } );
  return uniqAssets;
};

const fetchAlbums = async ( cameraRoll: Array<Object> ) => {
  try {
    const names = cameraRoll;
    const albums = await CameraRoll.getAlbums( { assetType: "Photos" } );

    if ( albums && albums.length > 0 ) { // attempt to fix error on android
      albums.forEach( ( { count, title } ) => {
        if ( count > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
          names.push( { label: title.toLocaleUpperCase( ), value: title } );
        }
      } );
    }
    return names;
  } catch ( e ) {
    return cameraRoll;
  }
};

export {
  fetchGalleryPhotos,
  checkForUniquePhotos,
  fetchAlbums
};
