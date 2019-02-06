// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackIcon from "react-native-vector-icons/AntDesign";

import i18n from "../../i18n";
import styles from "../../styles/badges/level";
import { colors } from "../../styles/global";
import badgeImages from "../../assets/badges";

const backIcon = ( <BackIcon name="closecircle" size={50} color={colors.white} /> );

type Props = {
  level: Object,
  toggleLevelModal: Function
};

const LevelModal = ( { level, toggleLevelModal }: Props ) => (
  <View style={styles.outerContainer}>
    {console.log( level, "level in modal" )}
    <View style={styles.container}>
      <Text style={styles.headerText}>{i18n.t( "banner.level_up" ).toLocaleUpperCase()}</Text>
      <LinearGradient
        style={styles.backgroundColor}
        colors={["#38976d", "#22784d"]}
      >
        <Image
          source={badgeImages[level.earnedIconName]}
          style={styles.image}
        />
        <Text style={styles.nameText}>{level.name.toLocaleUpperCase()}</Text>
      </LinearGradient>
      <Text style={styles.text}>{i18n.t( "banner.number_species", { number: level.count } )}</Text>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => toggleLevelModal()}>
      <Text>{backIcon}</Text>
    </TouchableOpacity>
  </View>
);

export default LevelModal;
