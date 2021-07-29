// @flow

import React, { useCallback, useContext } from "react";
import { View, Image, BackHandler, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import icons from "../../assets/icons";
import { setGradients } from "../../utility/matchHelpers";
import { ObservationContext, AppOrientationContext } from "../UserContext";

type Props = {
  screenType: string,
  setNavigationPath: Function
}

const MatchHeader = ( {
  screenType,
  setNavigationPath
}: Props ): Node => {
  const { isLandscape } = useContext( AppOrientationContext );
  const { observation } = useContext( ObservationContext );
  const { image, taxon } = observation;
  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";

  const { gradientDark, gradientLight } = setGradients( screenType );

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        setNavigationPath( "Camera" );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [setNavigationPath] )
  );

  const setCameraPath = ( ) => setNavigationPath( "Camera" );
  const showSocialSharing = ( ) => setNavigationPath( "Social" );

  const showSpeciesImage = ( taxon && taxon.speciesSeenImage ) && screenType !== "unidentified";

  return (
    <LinearGradient colors={[gradientDark, gradientLight]} style={styles.header}>
      <CustomBackArrow handlePress={setCameraPath} style={styles.backButton} />
      {speciesIdentified && (
        <TouchableOpacity style={styles.socialIcon} onPress={showSocialSharing}>
          <Image source={icons.iconShare} />
        </TouchableOpacity>
        )}
      <View style={[styles.imageContainer, styles.buttonContainer]}>
        <Image source={{ uri: image.uri }} style={[styles.imageCell, isLandscape && styles.landscapeImage]} />
        {showSpeciesImage && (
          <Image
            source={{ uri: taxon.speciesSeenImage }}
            style={[
              styles.imageCell,
              styles.marginLeft,
              isLandscape && styles.landscapeImage,
              isLandscape && styles.largeMargin
            ]}
          />
        )}
        {isLandscape && !showSpeciesImage && <View style={[styles.landscapeImage, styles.largeMargin]} />}
      </View>
    </LinearGradient>
  );
};

export default MatchHeader;
