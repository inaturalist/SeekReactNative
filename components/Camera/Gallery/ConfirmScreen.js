// @flow

import React, { useEffect, useContext } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, imageStyles } from "../../../styles/camera/confirm";
import { colors } from "../../../styles/global";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import GreenText from "../../UIComponents/GreenText";
import BackArrow from "../../UIComponents/Buttons/BackArrow";
import { ObservationContext } from "../../UserContext";
import ErrorScreen from "./Error";

const ConfirmScreen = ( ): Node => {
  const navigation = useNavigation( );
  const { observation, setObservation, error, setError } = useContext( ObservationContext );

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
  const imageSource = { uri: observation ? image.uri : null };

  const updateClicked = ( ) => setObservation( {
    ...observation,
    clicked: true
  } );

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
      <View style={viewStyles.header}>
        <BackArrow green />
        <View style={viewStyles.headerText}>
          <GreenText allowFontScaling={false} smaller text="confirm.identify" />
        </View>
        <View />
      </View>
      <View style={viewStyles.imageContainer}>
        {clicked && (
          <View style={viewStyles.loadingWheel}>
            <LoadingWheel color={colors.white} />
          </View>
        )}
        <Image
          source={imageSource}
          style={imageStyles.image}
        />
      </View>
      <View style={viewStyles.footer}>
        <GreenButton
          color={clicked && colors.seekTransparent}
          handlePress={updateClicked}
          text="confirm.button"
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
