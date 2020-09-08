// @flow

import React, { useCallback } from "react";
import { View, Image, BackHandler } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";

type Props = {
  gradientDark: string,
  gradientLight: string,
  setNavigationPath: Function,
  image: Object,
  taxon: Object
}

const MatchHeader = ( {
  gradientDark,
  gradientLight,
  setNavigationPath,
  image,
  taxon
}: Props ) => {
  useFocusEffect(
    useCallback( () => {
      const onBackPress = () => {
        setNavigationPath( "Camera" );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return () => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [setNavigationPath] )
  );

  return (
    // $FlowFixMe
    <LinearGradient
      colors={[gradientDark, gradientLight]}
      style={styles.header}
    >
      <CustomBackArrow
        handlePress={() => setNavigationPath( "Camera" )}
        style={styles.backButton}
      />
      <View style={[styles.imageContainer, styles.buttonContainer]}>
        <Image
          source={{ uri: image.uri }}
          style={styles.imageCell}
        />
        {( taxon && taxon.speciesSeenImage ) && (
          <Image
            source={{ uri: taxon.speciesSeenImage }}
            style={[styles.imageCell, styles.marginLeft]}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default MatchHeader;
