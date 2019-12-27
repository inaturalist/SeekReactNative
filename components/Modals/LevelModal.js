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
import BackButton from "../UIComponents/ModalBackButton";
import GreenText from "../UIComponents/GreenText";

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
  <>
    <View style={[styles.innerContainer, styles.modalTop]}>
      <View style={styles.headerMargins}>
        <GreenText text={screen === "achievements"
          ? "badges.your_level"
          : "banner.level_up"}
        />
      </View>
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
    <View style={[styles.innerContainer, styles.modalBottom]}>
      <Text style={styles.text}>{i18n.t( "banner.number_seen", { number: speciesCount } )}</Text>
    </View>
    <BackButton closeModal={closeModal} />
  </>
);

LevelModal.defaultProps = {
  screen: null
};

export default LevelModal;
