// @flow

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
}: Props ): React.Node => (
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
      <StyledText style={textStyles.nameText}>{i18n.t( level.intlName ).toLocaleUpperCase()}</StyledText>
    </LinearGradient>
    <StyledText style={textStyles.text}>{i18n.t( "banner.number_seen_plural", { count: speciesCount } )}</StyledText>
  </WhiteModal>
);

LevelModal.defaultProps = {
  screen: null
};

export default LevelModal;
