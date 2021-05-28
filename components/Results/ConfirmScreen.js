// @flow

import React, { useEffect, useContext } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/results/confirm";
import { colors } from "../../styles/global";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import { ObservationContext } from "../UserContext";

const ConfirmScreen = ( ): Node => {
  const navigation = useNavigation( );
  const { observation, setObservation } = useContext( ObservationContext );
  const { image, clicked } = observation;
  const { uri } = image;

  const updateClicked = ( ) => setObservation( {
    ...observation,
    clicked: true
  } );

  useEffect( ( ) => {
    if ( observation && observation.taxon && clicked ) {
      navigation.push( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation, clicked] );

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="confirm.identify" />
        </View>
        <View />
      </View>
      <View style={styles.imageContainer}>
        {clicked && (
          <View style={styles.loadingWheel}>
            <LoadingWheel color="white" />
          </View>
        )}
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </View>
      <View style={styles.footer}>
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
