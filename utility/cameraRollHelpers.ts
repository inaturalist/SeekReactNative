import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import type {
  GetPhotosParams
} from "@react-native-camera-roll/camera-roll";

const setGalleryFetchOptions = ( album: string | null, lastCursor: string | null ) => {
  const options: GetPhotosParams = {
    first: 28,
    assetType: "Photos",
    groupTypes: ( album === null ) ? "All" : "Album",
    include: ["location"] // This has a large performance impact on Android
  };

  if ( album ) { // append for cases where album isn't null
    options.groupName = album;
  }

  if ( lastCursor ) {
    options.after = lastCursor;
  }

  return options;
};

const fetchGalleryPhotos = async ( album: string | null, lastCursor: string | null ) => {
  const options = setGalleryFetchOptions( album, lastCursor );

  const photos = await CameraRoll.getPhotos( options );
  return photos;
};

interface Asset {
  node: {
    image: {
      uri: string
    }
  }
}

const checkForUniquePhotos = (
  seen: Set<string>,
  assets: Asset[]
): { newSeen: Set<string>, uniqAssets: Asset[] } => {
  // from cameraroll example: https://github.com/react-native-cameraroll/react-native-cameraroll/blob/7fa9b7c062c166cd94e62b4ab5d1f7b5f663c9a0/example/js/CameraRollView.js#L177
  // seen state can't be mutated locally, instead it's returned and
  // used by the parent component to update state
  const newSeen = new Set( seen );

  const uniqAssets = assets.filter( ( asset ) => {
    const value = asset.node.image.uri;
    if ( newSeen.has( value ) ) {
      return false;
    }
    newSeen.add( value );
    return true;
  } );
  return { uniqAssets, newSeen };
};

export interface CondensedAlbum {
  label: string,
  value: string
}

const fetchAlbums = async ( cameraRoll: CondensedAlbum[] ) => {
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
