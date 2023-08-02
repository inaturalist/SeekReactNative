// @flow

import React, { useContext } from "react";
import { View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { Node } from "react";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
// import icons from "../../assets/icons";
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
  const taxon = observation && observation.taxon;
  const image = observation && observation.image;
  const imageUri = image && image.uri;
  // const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";

  const { gradientDark, gradientLight } = setGradients( screenType );

  const setCameraPath = ( ) => setNavigationPath( "Camera" );
  // const showSocialSharing = ( ) => setNavigationPath( "Social" );

  const showSpeciesImage = ( taxon && taxon.speciesSeenImage ) && screenType !== "unidentified";

  return (
    <LinearGradient colors={[gradientDark, gradientLight]} style={styles.header}>
      <CustomBackArrow handlePress={setCameraPath} style={styles.backButton} />
      {/* {speciesIdentified && (
        <TouchableOpacity style={styles.socialIcon} onPress={showSocialSharing}>
          <Image source={icons.iconShare} />
        </TouchableOpacity>
        )} */}
      <View style={styles.imageContainer}>
        {imageUri && <Image source={{ uri: imageUri }} style={[styles.imageCell, isLandscape && styles.landscapeImage]} />}
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
