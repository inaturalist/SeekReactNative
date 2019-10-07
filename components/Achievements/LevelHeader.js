// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";

type Props = {
  +level: Object,
  +nextLevelCount: number,
  +toggleLevelModal: Function
}

const LevelHeader = ( { level, nextLevelCount, toggleLevelModal }: Props ) => (
  <TouchableOpacity
    onPress={() => toggleLevelModal()}
  >
    <LinearGradient
      colors={["#22784d", "#38976d"]}
      style={[styles.header, styles.center]}
    >
      {level ? (
        <View style={styles.row}>
          <Image source={badgeImages[level.earnedIconName]} style={styles.levelImage} />
          <View style={styles.textContainer}>
            <Text style={styles.lightText}>{i18n.t( "badges.your_level" ).toLocaleUpperCase()}</Text>
            <Text style={styles.headerText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</Text>
            <Text style={styles.text}>
              {level.count >= 150
                ? i18n.t( "badges.observe_max" )
                : i18n.t( "badges.observe", { number: nextLevelCount } )}
            </Text>
          </View>
        </View>
      ) : null}
    </LinearGradient>
  </TouchableOpacity>
);

export default LevelHeader;
