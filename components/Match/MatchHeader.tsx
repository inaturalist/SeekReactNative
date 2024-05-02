import React from "react";
import { View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { setGradients } from "../../utility/matchHelpers";
import { useAppOrientation } from "../Providers/AppOrientationContext";
import { useObservation } from "../Providers/ObservationProvider";

interface Props {
  screenType: string;
  setNavigationPath: ( path: string ) => void;
}

const MatchHeader = ( {
  screenType,
  setNavigationPath
}: Props ) => {
  const { isLandscape } = useAppOrientation( );
  const { observation } = useObservation();
  const taxon = observation && observation.taxon;
  const image = observation && observation.image;
  const imageUri = image && image.uri;

  const { gradientDark, gradientLight } = setGradients( screenType );

  const setCameraPath = ( ) => setNavigationPath( "Camera" );

  const showSpeciesImage = ( taxon && taxon.speciesSeenImage ) && screenType !== "unidentified";

  return (
    <LinearGradient colors={[gradientDark, gradientLight]} style={styles.header}>
      <CustomBackArrow handlePress={setCameraPath} style={styles.backButton} />
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
