// @flow

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

import LevelModal from "../AchievementModals/LevelModal";
import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";

type Props = {
  +level: Object,
  +nextLevelCount: number,
  +speciesCount: number
}

const LevelHeader = ( { level, nextLevelCount, speciesCount }: Props ) => {
  const [showLevelModal, setLevelModal] = useState( false );

  const toggleLevelModal = () => {
    setLevelModal( !showLevelModal );
  };

  const renderModalContent = () => (
    <LevelModal
      level={level}
      screen="achievements"
      speciesCount={speciesCount}
      toggleLevelModal={toggleLevelModal}
    />
  );

  return (
    <TouchableOpacity
      onPress={() => toggleLevelModal()}
    >
      <Modal
        isVisible={showLevelModal}
        onBackdropPress={() => toggleLevelModal()}
        onSwipeComplete={() => toggleLevelModal()}
        swipeDirection="down"
      >
        {renderModalContent()}
      </Modal>
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
};

export default LevelHeader;
