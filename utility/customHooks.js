import { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import RNFS from "react-native-fs";

import i18n from "../i18n";
import { fetchLocationName } from "./locationHelpers";
import { dirPictures } from "./dirStorage";
import { writeToDebugLog } from "./photoHelpers";

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

const useUserPhoto = ( uuidString, defaultPhoto ) => {
  const [photo, setPhoto] = useState( null );

  const checkForSeekV2Photos = useCallback( () => {
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
  }, [defaultPhoto] );

  useEffect( () => {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
    if ( Platform.OS === "ios" && seekv1Photos ) {
      const photoPath = `${seekv1Photos}/${uuidString}`;

      RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
        setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
      } ).catch( () => checkForSeekV2Photos() );
    } else {
      checkForSeekV2Photos();
    }
  }, [checkForSeekV2Photos, uuidString] );

  return photo;
};

export {
  useScrollToTop,
  useLocationName,
  useUserPhoto
};
