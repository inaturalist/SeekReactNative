import * as React from "react";
import {
  Image,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import badgeImages from "../../assets/badges";
import i18n from "../../i18n";
import { colors } from "../../styles/global";
import { imageStyles, textStyles, viewStyles } from "../../styles/modals/levelModal";
import { baseTextStyles } from "../../styles/textStyles";
import GreenText from "../UIComponents/GreenText";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import StyledText from "../UIComponents/StyledText";

interface Props {
  readonly level: {
    earnedIconName: string;
    intlName: string;
  };
  readonly speciesCount?: number;
  readonly closeModal: () => void;
  readonly screen?: string | null;
}

const LevelModal = ( {
  level,
  speciesCount,
  closeModal,
  screen = null,
}: Props ) => (
  <WhiteModal closeModal={closeModal}>
    <View style={viewStyles.headerMargins}>
      <GreenText text={screen === "achievements"
        ? "badges.your_level"
        : "banner.level_up"}
      />
    </View>
    <LinearGradient
      colors={[colors.greenGradientLight, colors.greenGradientDark]}
      style={viewStyles.backgroundColor}
    >
      <Image
        source={badgeImages[level.earnedIconName]}
        style={imageStyles.image}
      />
      <StyledText style={[baseTextStyles.challengeTitle, textStyles.nameText]}>{i18n.t( level.intlName ).toLocaleUpperCase()}</StyledText>
    </LinearGradient>
    <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "banner.number_seen_plural", { count: speciesCount } )}</StyledText>
  </WhiteModal>
);

export default LevelModal;
