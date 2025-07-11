import * as React from "react";
import {
  View,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/modals/levelModal";
import { colors } from "../../styles/global";
import badgeImages from "../../assets/badges";
import GreenText from "../UIComponents/GreenText";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly level: {
    earnedIconName: string,
    intlName: string
  };
  readonly speciesCount: number | null;
  readonly closeModal: () => void;
  readonly screen?: string | null;
}

const LevelModal = ( {
  level,
  speciesCount,
  closeModal,
  screen = null
}: Props ) => (
  <WhiteModal closeModal={closeModal}>
    <View style={viewStyles.headerMargins}>
      <GreenText text={screen === "achievements"
        ? "badges.your_level"
        : "banner.level_up"}
      />
    </View>
    {/* $FlowFixMe */}
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
