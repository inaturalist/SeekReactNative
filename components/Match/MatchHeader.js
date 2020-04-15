// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
}: Props ) => (
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

export default MatchHeader;
