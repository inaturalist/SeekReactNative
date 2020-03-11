// @flow

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import LevelModal from "../Modals/LevelModal";
import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/achievements";
import Modal from "../UIComponents/Modal";
import { localizeNumber } from "../../utility/helpers";

type Props = {
  +level: Object,
  +nextLevelCount: ?number,
  +speciesCount: ?number
}

const LevelHeader = ( { level, nextLevelCount, speciesCount }: Props ) => {
  const [showModal, setModal] = useState( false );

  const openModal = () => {
    setModal( true );
  };

  const closeModal = () => {
    setModal( false );
  };

  const renderModalContent = () => (
    <LevelModal
      level={level}
      screen="achievements"
      speciesCount={speciesCount}
      closeModal={closeModal}
    />
  );

  return (
    <TouchableOpacity onPress={() => openModal()}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={renderModalContent()}
      />
      <LinearGradient
        colors={["#22784d", "#38976d"]}
        style={[styles.header, styles.center]}
      >
        {level && (
          <View style={styles.row}>
            <Image source={badgeImages[level.earnedIconName]} style={styles.levelImage} />
            <View style={styles.textContainer}>
              <Text style={styles.lightText}>{i18n.t( "badges.your_level" ).toLocaleUpperCase()}</Text>
              <Text style={styles.headerText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</Text>
              <Text style={styles.text}>
                {level.count >= 150
                  ? i18n.t( "badges.observe_max" )
                  : i18n.t( "badges.observe", { number: localizeNumber( nextLevelCount ) } )}
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LevelHeader;
