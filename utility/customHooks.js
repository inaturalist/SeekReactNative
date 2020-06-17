import { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import Realm from "realm";

import i18n from "../i18n";
import { fetchLocationName, fetchTruncatedUserLocation } from "./locationHelpers";
import { dirPictures } from "./dirStorage";
import { writeToDebugLog } from "./photoHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";
import { getTaxonCommonName } from "./helpers";
import realmConfig from "../models";

const useScrollToTop = ( scrollView, navigation ) => {
  const scrollToTop = () => {
    if ( scrollView && scrollView.current !== null ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      scrollToTop();
    } );
  } );
};

const useLocationName = ( latitude, longitude ) => {
  const [location, setLocation] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    // reverseGeocodeLocation
    fetchLocationName( latitude, longitude ).then( ( locationName ) => {
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

const useUserPhoto = ( item ) => {
  const [photo, setPhoto] = useState( null );

  const checkForSeekV2Photos = useCallback( () => {
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
        setPhoto( { uri: backupFilepath } );
      } else {
        writeToDebugLog( backupUri );
        RNFS.readFile( backupUri, { encoding: "base64" } ).then( ( encodedData ) => {
          setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( ( e ) => console.log( e ) );
      }
    } else if ( mediumUrl ) {
      setPhoto( { uri: mediumUrl } );
    }
  }, [item] );

  const checkV1 = useCallback( async ( uuidString ) => {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
    const photoPath = `${seekv1Photos}/${uuidString}`;

    try {
      const isv1Photo = await RNFS.exists( photoPath );

      if ( isv1Photo ) {
        RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
          setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => checkForSeekV2Photos() );
      } else {
        // this is the one being fetched in test device
        checkForSeekV2Photos();
      }
    } catch ( e ) {
      console.log( e, "error checking for v1 photo existence" );
    }
  }, [checkForSeekV2Photos] );

  useEffect( () => {
    if ( item !== null ) {
      if ( Platform.OS === "ios" ) {
        checkV1( item.uuidString );
      } else {
        checkForSeekV2Photos();
      }
    } else {
      setPhoto( null );
    }
  }, [checkForSeekV2Photos, checkV1, item] );

  return photo;
};

const useLocationPermission = () => {
  const [granted, setGranted] = useState( true );

  const fetchPermissionStatus = async () => {
    try {
      const status = await checkLocationPermissions();
      setGranted( status );
    } catch ( e ) {
      setGranted( false );
    }
  };

  useEffect( () => {
    if ( Platform.OS === "android" ) {
      fetchPermissionStatus();
    }
  }, [] );
  return granted;
};

const useCommonName = ( id ) => {
  const [commonName, setCommonName] = useState( null );

  getTaxonCommonName( id ).then( ( name ) => {
    setCommonName( name );
  } );

  return commonName;
};

const useTruncatedUserCoords = () => {
  const granted = useLocationPermission();
  const [coords, setCoords] = useState( null );

  const fetchCoords = useCallback( async () => {
    try {
      const userCoords = await fetchTruncatedUserLocation();

      if ( !coords || ( userCoords.latitude !== coords.latitude ) ) {
        setCoords( userCoords );
      }
    } catch ( e ) {
      setCoords( null );
    }
  }, [coords] );

  useEffect( () => {
    if ( Platform.OS === "android" && !granted ) {
      setCoords( null );
    } else {
      fetchCoords();
    }
  }, [granted, fetchCoords] );

  return coords;
};

const useSeenTaxa = ( id ) => {
  const [seenTaxa, setSeenTaxa] = useState( null );

  useEffect( () => {
    if ( id !== null ) {
      Realm.open( realmConfig ).then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const seen = observations.filtered( `taxon.id == ${id}` )[0];
        setSeenTaxa( seen );
      } ).catch( ( e ) => console.log( "[DEBUG] Failed to open realm, error: ", e ) );
    }
  }, [id] );

  return seenTaxa;
};

export {
  useScrollToTop,
  useLocationName,
  useUserPhoto,
  useLocationPermission,
  useCommonName,
  useTruncatedUserCoords,
  useSeenTaxa
};
