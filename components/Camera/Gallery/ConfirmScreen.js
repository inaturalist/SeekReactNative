// @flow

import React, { useEffect } from "react";
import type { Node } from "react";
import { useNavigation } from "@react-navigation/native";

import ErrorScreen from "./Error";
import { useObservation } from "../../Providers/ObservationProvider";

const ConfirmScreen = ( ): Node => {
  const navigation = useNavigation( );
  const { observation, error, setError } = useObservation();

  useEffect( ( ) => {
    if ( observation && observation.taxon ) {
      navigation.push( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation] );

  useEffect( ( ) => {
    navigation.addListener( "blur", ( ) => {
      setError( null );
    } );
  }, [navigation, setError] );

  if ( error ) {
    return (
      <ErrorScreen
        error={error.error}
        number={error.numberOfHours}
      />
    );
  }
};

export default ConfirmScreen;
