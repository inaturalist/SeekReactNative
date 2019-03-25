// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/badges/level";
import badgeImages from "../../assets/badges";
import icons from "../../assets/icons";

type Props = {
  level: Object,
  toggleLevelModal: Function
};

const LevelModal = ( { level, toggleLevelModal }: Props ) => (
  <SafeAreaView style={styles.safeView}>
    <View style={styles.outerContainer}>
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
          <Text style={styles.nameText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</Text>
        </LinearGradient>
        <Text style={styles.text}>{i18n.t( "banner.number_seen", { number: level.count } )}</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => toggleLevelModal()}>
        <Image source={icons.closeModal} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default LevelModal;
