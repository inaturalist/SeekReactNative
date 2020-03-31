import { useState, useEffect } from "react";
import { Platform } from "react-native";

import i18n from "../i18n";
import { fetchLocationName } from "./locationHelpers";
import { getChallengeIndex } from "./challengeHelpers";
import { getRoute } from "./helpers";

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

const useIndex = ( navigation ) => {
  const [index, setIndex] = useState( null );

  const setupScreen = async () => {
    const i = await getChallengeIndex();
    setIndex( i );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      setupScreen();
    } );
  } );

  return index;
};

const useRoute = ( navigation ) => {
  const [route, setRoute] = useState( null );

  const setupScreen = async () => {
    const r = await getRoute();
    setRoute( r );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      setupScreen();
    } );
  } );

  return route;
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

export {
  useScrollToTop,
  useLocationName,
  useIndex,
  useRoute
};
