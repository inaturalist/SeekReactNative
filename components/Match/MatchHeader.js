// @flow

import React, { useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/match/match";
import icons from "../../assets/icons";

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
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => setNavigationPath( "Camera" )}
        style={styles.backButton}
      >
        <Image source={icons.backButton} />
      </TouchableOpacity>
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
