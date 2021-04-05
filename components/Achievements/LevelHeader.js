// @flow

import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { Node } from "react";

import LevelModal from "../Modals/LevelModal";
import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modals/Modal";
import { localizeNumber } from "../../utility/helpers";

type Props = {
  +level: Object,
  +nextLevelCount: number,
  +speciesCount: ?number
}

const LevelHeader = ( { level, nextLevelCount, speciesCount }: Props ): Node => {
  const [showModal, setModal] = useState( false );

  const openModal = useCallback( ( ) => setModal( true ), [] );
  const closeModal = useCallback( ( ) => setModal( false ), [] );

  const renderModalContent = (
    <LevelModal
      level={level}
      screen="achievements"
      speciesCount={speciesCount}
      closeModal={closeModal}
    />
  );

  return (
    <TouchableOpacity onPress={openModal}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={renderModalContent}
      />
      {/* $FlowFixMe */}
      <LinearGradient
        colors={[colors.greenGradientDark, colors.greenGradientLight]}
        style={[styles.header, styles.center, styles.row]}
      >
        {level && (
          <>
            <Image source={badgeImages[level.earnedIconName]} style={styles.levelImage} />
            <View style={styles.textContainer}>
              <Text style={styles.lightText}>{i18n.t( "badges.your_level" ).toLocaleUpperCase()}</Text>
              <Text style={styles.headerText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</Text>
              <Text style={styles.text}>
                {level.count >= 150
                  ? i18n.t( "badges.observe_max" )
                  : i18n.t( "badges.observe_plural", { count: localizeNumber( nextLevelCount ) } )}
              </Text>
            </View>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LevelHeader;
