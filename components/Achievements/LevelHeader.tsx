import React, { useCallback, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import badgeImages from "../../assets/badges";
import i18n from "../../i18n";
import { imageStyles, textStyles, viewStyles } from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import { baseTextStyles } from "../../styles/textStyles";
import { localizeNumber } from "../../utility/helpers";
import LevelModal from "../Modals/LevelModal";
import Modal from "../UIComponents/Modals/Modal";
import StyledText from "../UIComponents/StyledText";

interface Props {
  level: {
    earnedIconName: string;
    intlName: string;
    count: number;
  };
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
