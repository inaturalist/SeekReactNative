// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/banner/badgeToast";
import badgeImages from "../../assets/badges";

type Props = {
  level: Object
};

const LevelModal = ( { level }: Props ) => (
  <View>
    <Text>{i18n.t( "banner.level_up" )}</Text>
    <LinearGradient
      style={styles.backgroundColor}
      colors={["#38976d", "#22784d"]}
    >
      <Image source={badgeImages[level.earnedIconName]} />
      <Text>{level.name}</Text>
    </LinearGradient>
    <Text>{i18n.t( "banner.number_species", { number: level.count } )}</Text>
  </View>
);

export default LevelModal;
