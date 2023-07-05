// @flow

import { useState, useEffect, useCallback } from "react";
import { AppState, AppStateStatus, Platform, Dimensions } from "react-native";
import RNFS from "react-native-fs";
import Realm from "realm";
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from "react-native-device-info";
import inatjs from "inaturalistjs";
import Orientation from "react-native-orientation-locker";

import i18n from "../i18n";
import { fetchLocationName, fetchTruncatedUserLocation } from "./locationHelpers";
import { dirPictures } from "./dirStorage";
import { checkLocationPermissions } from "./androidHelpers.android";
import { getTaxonCommonName } from "./commonNamesHelpers";
import realmConfig from "../models";
import { createRegion } from "./locationHelpers";
import createUserAgent from "./userAgent";

const useScrollToTop = (
  scrollView: {
    current: {
      scrollTo: ( {
        x: number,
        y: number,
        animated: boolean
      } ) => void
    }
  },
  navigation: any,
  route: any
) => {
  const scrollToTop = useCallback( () => {
    if ( scrollView && scrollView.current !== null ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }, [scrollView] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( route !== "Challenges" ) {
        scrollToTop();
      }
    } );
  }, [route, navigation, scrollToTop] );
};

const useLocationName = ( latitude: ?number, longitude: ?number ): ?string => {
  const [location, setLocation] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    // reverseGeocodeLocation
    fetchLocationName( latitude, longitude ).then( ( locationName: ?string ) => {
      if ( isCurrent ) {
        if ( locationName === null ) {
          setLocation( i18n.t( "location_picker.undefined" ) ); // for oceans
        } else {
          setLocation( locationName );
        }
      }
    } ).catch( () => {
      if ( isCurrent ) {
        setLocation( null );
      }
    } );

    return () => {
      isCurrent = false;
    };
  }, [latitude, longitude] );

  return location;
};

const useUserPhoto = ( item: ?{
 taxon: {
   defaultPhoto?: {
     backupUri: ?string,
     mediumUrl: ?string
   }
 },
 uuidString: string
} ): ?{ uri: string } => {
  const [photo, setPhoto] = useState( null );

  const checkForSeekV2Photos = useCallback( ( isCurrent ) => {
    if ( !item ) {
      return;
    }
    const { taxon } = item;
    const { defaultPhoto } = taxon;
    if ( !defaultPhoto ) {
      return;
    }

    const { backupUri, mediumUrl } = defaultPhoto;
    if ( backupUri ) {
      if ( Platform.OS === "ios" ) {
        const uri = backupUri.split( "Pictures/" );
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        if ( isCurrent ) {
          setPhoto( { uri: backupFilepath } );
        }
      } else {
        RNFS.readFile( backupUri, { encoding: "base64" } ).then( ( encodedData ) => {
          if ( isCurrent ) {
            setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
          }
        } ).catch( ( e ) => console.log( "Error reading backupUri file in hooks:", e ) );
      }
    } else if ( mediumUrl ) {
      if ( isCurrent ) {
        setPhoto( { uri: mediumUrl } );
      }
    }
  }, [item] );

  const checkV1 = useCallback( async ( uuidString: string, isCurrent ) => {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
    const photoPath = `${seekv1Photos}/${uuidString}`;

    try {
      const isv1Photo = await RNFS.exists( photoPath );

      if ( isv1Photo ) {
        RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
          if ( isCurrent ) {
            setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
          }
        } ).catch( () => checkForSeekV2Photos() );
      } else {
        // this is the one being fetched in test device
        checkForSeekV2Photos( isCurrent );
      }
    } catch ( e ) {
      console.log( e, "error checking for v1 photo existence" );
    }
  }, [checkForSeekV2Photos] );

  useEffect( () => {
    let isCurrent = true;
    if ( item !== null ) {
      if ( Platform.OS === "ios" ) {
        // $FlowFixMe
        checkV1( item.uuidString, isCurrent );
      } else {
        checkForSeekV2Photos( isCurrent );
      }
    } else {
      setPhoto( null );
    }
    return () => {
      isCurrent = false;
    };
  }, [checkForSeekV2Photos, checkV1, item] );

  return photo;
};

const useLocationPermission = (): ?boolean => {
  const [granted, setGranted] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    const fetchPermissionStatus = async () => {
      try {
        const status = await checkLocationPermissions();
        if ( isCurrent ) {
          setGranted( status );
        }
      } catch ( e ) {
        if ( isCurrent ) {
          setGranted( false );
        }
      }
    };

    if ( Platform.OS === "android" ) {
      fetchPermissionStatus();
    }
    return () => {
      isCurrent = false;
    };
  }, [] );
  return granted;
};

const useCommonName = ( id: ?number ): ?string => {
  const [commonName, setCommonName] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    if ( !id ) { return; }

    getTaxonCommonName( id ).then( ( name ) => {
      if ( isCurrent ) {
        setCommonName( name );
      }
    } );

    return () => {
      isCurrent = false;
    };
  }, [id] );

  return commonName;
};

const useTruncatedUserCoords = ( granted: ?boolean ): ?{
  latitude: number,
  longitude: number
} => {
  const [coords, setCoords] = useState( null );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchCoords = async ( ) => {
      try {
        const userCoords = await fetchTruncatedUserLocation( );

        // this stops this hook from rerunning a bunch of times
        if ( !coords || ( userCoords.latitude !== coords.latitude ) ) {
          if ( isCurrent ) {
            setCoords( userCoords );
          }
        }
      } catch ( e ) {
        setCoords( null );
      }
    };

    if ( Platform.OS === "android" && !granted ) {
      if ( coords && isCurrent ) {
        setCoords( null );
      }
    } else {
      fetchCoords( );
    }

    return ( ) => {
      isCurrent = false;
    };
  }, [granted, coords] );

  return coords;
};

const useSeenTaxa = ( id: number ): ?Object => {
  const [seenTaxa, setSeenTaxa] = useState( null );

  useEffect( () => {
    setSeenTaxa( null );
    let isCurrent = true;

    Realm.open( realmConfig ).then( ( realm ) => {
      const observations = realm.objects( "ObservationRealm" );
      const seen = observations.filtered( `taxon.id == ${id}` )[0];

      // seen is undefined when filtered realm is empty
      if ( isCurrent && seen !== undefined ) {
        setSeenTaxa( seen );
      }
    } ).catch( ( e ) => console.log( "[DEBUG] Failed to open realm, error: ", e ) );

    return () => {
      isCurrent = false;
    };
  }, [id] );

  return seenTaxa;
};

const useRegion = (
  coords: ?{ latitude: number, longitude: number },
  seenTaxa: ?{ latitude: number, longitude: number }
) : ?Object => {
  const [region, setRegion] = useState( {} );

  const setNewRegion = ( newRegion ) => setRegion( createRegion( newRegion ) );

  useEffect( () => {
    // if user has seen observation, fetch data based on obs location
    if ( seenTaxa && seenTaxa.latitude ) {
      setNewRegion( seenTaxa );
    }
  }, [seenTaxa] );

  useEffect( () => {
      // otherwise, fetch data based on user location
    if ( !seenTaxa && ( coords && coords.latitude ) ) {
      setNewRegion( coords );
    }
  }, [coords, seenTaxa] );

  return region;
};

const useInternetStatus = ( ): boolean => {
  const [internet, setInternet] = useState( true );

  useEffect( ( ) => {
    let isCurrent = true;

    const checkForInternet = async ( ) => {
      const { type } = await NetInfo.fetch( );

      if ( isCurrent ) {
        if ( type === "none" || type === "unknown" ) {
          setInternet( false );
        } else {
          setInternet( true );
        }
      }
    };

    checkForInternet( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return internet;
};

const useEmulator = ( ): boolean => {
  const [emulator, setEmulator] = useState( false );

  useEffect( ( ) => {
    let isCurrent = true;

    const checkForEmulator = async ( ) => {
      const isEmulator = await DeviceInfo.isEmulator( );
      if ( isCurrent ) {
        setEmulator( isEmulator );
      }
    };

    checkForEmulator( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return emulator;
};

const useFetchUserSettings = ( ): Object => {
  const [settings, setSettings] = useState( { } );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchUserSettings = async ( ) => {
      const realm = await Realm.open( realmConfig );
      const userSettings = realm.objects( "UserSettingsRealm" );
      if ( isCurrent ) {
        setSettings( userSettings[0] );
      }
    };

    fetchUserSettings( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return settings;
};

const useUploadedObservationCount = ( {
  login,
  username,
  year,
  triggerReload
}: {
  login: ?string,
  username: string,
  year: number,
  triggerReload: Boolean
} ): any => {
  const [observationCount, setObservationCount] = useState( null );

  const updateSavedLogin = async ( newCount ) => {
    try {
      const realm = await Realm.open( realmConfig );
      const savedLogin = realm.objects( "LoginRealm" );

      if ( savedLogin[0].observationCount !== newCount ) {
        realm.write( () => {
          savedLogin[0].observationCount = newCount;
        } );
      }
      return savedLogin[0].observationCount;
    } catch ( e ) {
      console.log( "couldn't update saved login" );
    }
  };

  useEffect( () => {
    let isCurrent = true;

    const fetchObservationsMadeViaSeek = async () => {
      // TODO: rewrite to not use API request but local data only, otherwise data from other phones (but same login) would also show here
      let params = {
        oauth_application_id: 333,
        user_id: username
      };
      if ( year ) {
        params = {...params, year};
      }
      const options = { user_agent: createUserAgent() };
      const response = await inatjs.observations.search( params, options );

      let count = response.total_results;
      if ( !year ) {
        count = await updateSavedLogin( count );
      }

      if ( isCurrent ) {
        setObservationCount( count );
      }
    };

    if ( login ) {
      fetchObservationsMadeViaSeek();
    }

    return () => {
      isCurrent = false;
    };
  }, [login, username, year, triggerReload] );

  return observationCount;
};

// TODO: this is the same as in useFetchAchievements
const useSpeciesCount = (): any => {
  const [speciesCount, setSpeciesCount] = useState( null );
  useEffect( () => {
    const fetchSpeciesCount = async () => {
      try {
        const realm = await Realm.open( realmConfig );
        const count = realm.objects( "TaxonRealm" ).length;
        setSpeciesCount( count );
      } catch ( e ) {
        console.log( e, "couldn't open realm for fetching species count" );
      }
    };
    fetchSpeciesCount();
  }, [] );

  return speciesCount;
};

const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState( true );

  useEffect( () => {
    const onChange = ( state: AppStateStatus ): void => {
      setIsForeground( state === "active" );
    };
    const listener = AppState.addEventListener( "change", onChange );
    return () => listener.remove();
  }, [setIsForeground] );

  return isForeground;
};

export const LANDSCAPE_LEFT = "landscapeLeft";
export const LANDSCAPE_RIGHT = "landscapeRight";
export const PORTRAIT = "portrait";
export const PORTRAIT_UPSIDE_DOWN = "portraitUpsideDown";

export function orientationLockerToIosOrientation( orientation: string ): string {
  // react-native-orientation-locker and react-native-vision-camera  different
  // string values for these constants, so we map everything to the
  // react-native-vision-camera versions
  switch ( orientation ) {
    case "LANDSCAPE-RIGHT":
      return LANDSCAPE_LEFT;
    case "LANDSCAPE-LEFT":
      return LANDSCAPE_RIGHT;
    case "PORTRAIT-UPSIDEDOWN":
      return PORTRAIT_UPSIDE_DOWN;
    default:
      return PORTRAIT;
  }
}

const useDeviceOrientation = (): Object => {
  const { width, height } = Dimensions.get( "screen" );
  const [screenWidth, setScreenWidth] = useState( width );
  const [screenHeight, setScreenHeight] = useState( height );

  const [deviceOrientation, setDeviceOrientation] = useState();

  useEffect( () => {
    // Word of caution: getInitialOrientation gets the orientation when JS
    // started, so it's almost always PORTRAIT; getOrientation gets the
    // orientation the app thinks it's in, which should be PORTRAIT on
    // phones; getDeviceOrientation gets the actual current orientation of
    // the device, which is what we want here for the initial value
    Orientation.getDeviceOrientation( ( newOrientation ) => {
      setDeviceOrientation( orientationLockerToIosOrientation( newOrientation ) );
    } );
  }, [] );

  const isLandscapeMode = [LANDSCAPE_LEFT, LANDSCAPE_RIGHT].includes(
    deviceOrientation
  );
  const isTablet = DeviceInfo.isTablet();
  // detect device rotation instead of using screen orientation change
  const onDeviceRotation = useCallback(
    ( orientation ) => {
      // FACE-UP and FACE-DOWN could be portrait or landscape, I guess the
      // device can't tell, so I'm just not changing the layout at all for
      // those. ~~~ kueda 20230420
      if ( orientation === "FACE-UP" || orientation === "FACE-DOWN" ) {
        return;
      }
      setDeviceOrientation( orientationLockerToIosOrientation( orientation ) );
    },
    [setDeviceOrientation]
  );

  useEffect( () => {
    Orientation.addDeviceOrientationListener( onDeviceRotation );

    return () => {
      Orientation?.removeOrientationListener( onDeviceRotation );
    };
  } );

  useEffect( () => {
    // it doesn't seem like Dimensions changes the width immediately on device rotation
    // so doing this manually
    if ( isLandscapeMode ) {
      setScreenWidth( Math.max( width, height ) );
      setScreenHeight( Math.min( width, height ) );
    } else {
      setScreenWidth( Math.min( width, height ) );
      setScreenHeight( Math.max( width, height ) );
    }
  }, [isLandscapeMode, width, height] );

  return {
    deviceOrientation,
    isTablet,
    isLandscapeMode,
    screenWidth,
    screenHeight
  };
};

export {
  useScrollToTop,
  useLocationName,
  useUserPhoto,
  useLocationPermission,
  useCommonName,
  useTruncatedUserCoords,
  useSeenTaxa,
  useRegion,
  useInternetStatus,
  useEmulator,
  useFetchUserSettings,
  useUploadedObservationCount,
  useSpeciesCount,
  useIsForeground,
  useDeviceOrientation
};
