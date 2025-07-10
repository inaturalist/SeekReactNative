import { useState, useEffect, useCallback } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import Realm from "realm";
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from "react-native-device-info";
import inatjs from "inaturalistjs";

import i18n from "../i18n";
import { fetchLocationName, fetchTruncatedUserLocation } from "./locationHelpers";
import type { TruncatedCoords } from "./locationHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";
import realmConfig from "../models";

const useScrollToTop = (
  scrollView: {
    current: {
      scrollTo: ( {
        x,
        y,
        animated
      }: {
        x: number;
        y: number;
        animated: boolean;
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
    // TODO: unsubscribe from listener
    navigation.addListener( "focus", () => {
      if ( route !== "Challenges" ) {
        scrollToTop();
      }
    } );
  }, [route, navigation, scrollToTop] );
};

const useLocationName = ( latitude: number | null, longitude: number | null ): string | null => {
  const [location, setLocation] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    // reverseGeocodeLocation
    fetchLocationName( latitude, longitude ).then( ( locationName: string | null ) => {
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

const useLocationPermission = (): boolean | null => {
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

const useTruncatedUserCoords = ( granted: boolean | null ): TruncatedCoords | null => {
  const [coords, setCoords] = useState<TruncatedCoords | null>( null );

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

const useUploadedObservationCount = ( {
  login,
  username,
  year,
  triggerReload
}: {
  login: string | null,
  username: string,
  year: number,
  triggerReload: boolean
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
      const response = await inatjs.observations.search( params );

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

export {
  useScrollToTop,
  useLocationName,
  useLocationPermission,
  useTruncatedUserCoords,
  useInternetStatus,
  useEmulator,
  useUploadedObservationCount,
  useSpeciesCount,
  useIsForeground
};
