// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/modals/levelModal";
import badgeImages from "../../assets/badges";
import GreenText from "../UIComponents/GreenText";
import WhiteModal from "../UIComponents/WhiteModal";

type Props = {
  +level: Object,
  +speciesCount: ?number,
  +closeModal: Function,
  +screen?: ?string
};

const LevelModal = ( {
  level,
  speciesCount,
  closeModal,
  screen
}: Props ) => (
  <WhiteModal closeModal={closeModal}>
    <View style={styles.headerMargins}>
      <GreenText text={screen === "achievements"
        ? "badges.your_level"
        : "banner.level_up"}
      />
    </View>
    <LinearGradient
      colors={["#38976d", "#22784d"]}
      style={styles.backgroundColor}
    >
      <Image
        source={badgeImages[level.earnedIconName]}
        style={styles.image}
      />
      <Text style={styles.nameText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</Text>
    </LinearGradient>
    <View style={styles.modalBottom}>
      <Text style={styles.text}>{i18n.t( "banner.number_seen", { count: speciesCount } )}</Text>
    </View>
  </WhiteModal>
);

LevelModal.defaultProps = {
  screen: null
};

export default LevelModal;
