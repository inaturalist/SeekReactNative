import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import LevelModal from "../Modals/LevelModal";
import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import { textStyles, viewStyles, imageStyles } from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modals/Modal";
import { localizeNumber } from "../../utility/helpers";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  level: Object;
  nextLevelCount: number;
  speciesCount?: number;
}

const LevelHeader = ( { level, nextLevelCount, speciesCount }: Props ) => {
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
      <LinearGradient
        colors={[colors.greenGradientDark, colors.greenGradientLight]}
        style={[viewStyles.header, viewStyles.center, viewStyles.row]}
      >
        {level && (
          <>
            <Image source={badgeImages[level.earnedIconName]} style={imageStyles.levelImage} />
            <View style={viewStyles.textContainer}>
              <StyledText style={[baseTextStyles.challengeMonth, textStyles.lightText]}>{i18n.t( "badges.your_level" ).toLocaleUpperCase()}</StyledText>
              <StyledText style={baseTextStyles.challengeTitle}>{i18n.t( level.intlName ).toLocaleUpperCase()}</StyledText>
              <StyledText style={[baseTextStyles.bodyWhite, textStyles.text]}>
                {level.count >= 150
                  ? i18n.t( "badges.observe_max" )
                  : i18n.t( "badges.observe_plural", { count: localizeNumber( nextLevelCount ) } )}
              </StyledText>
            </View>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LevelHeader;
