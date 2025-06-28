// @flow

import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";
import { useNavigation } from "@react-navigation/native";

import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ErrorScreen from "./Error";
import { useObservation } from "../../Providers/ObservationProvider";

const ConfirmScreen = ( ): Node => {
  const navigation = useNavigation( );
  const { observation, error, setError } = useObservation();

  useEffect( ( ) => {
    if ( observation && observation.taxon && observation.clicked ) {
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

  if ( !observation ) {
    return null;
  }

  const { image, clicked } = observation;

  if ( error ) {
    return (
      <ErrorScreen
        error={error.error}
        number={error.numberOfHours}
      />
    );
  }

  return (
    <SafeAreaView edges={["top"]}>
        <GreenButton
        />
    </SafeAreaView>
  );
};

export default ConfirmScreen;
