// @flow

import React, { useCallback } from "react";
import { View, Image, BackHandler } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";

type Props = {
  gradientColorDark: string,
  gradientColorLight: string,
  setNavigationPath: Function,
  userImage: Object,
  speciesSeenImage: Object
}

const MatchHeader = ( {
  gradientColorDark,
  gradientColorLight,
  setNavigationPath,
  userImage,
  speciesSeenImage
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
    <LinearGradient
      colors={[gradientColorDark, gradientColorLight]}
      style={styles.header}
    >
      <CustomBackArrow
        handlePress={() => setNavigationPath( "Camera" )}
        style={styles.backButton}
      />
      <View style={[styles.imageContainer, styles.buttonContainer]}>
        <Image
          source={{ uri: userImage }}
          style={styles.imageCell}
        />
        {speciesSeenImage && (
          <Image
            source={{ uri: speciesSeenImage }}
            style={[styles.imageCell, styles.marginLeft]}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default MatchHeader;
