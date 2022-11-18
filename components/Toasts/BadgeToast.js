// @flow

import * as React from "react";
import {
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, imageStyles, textStyles } from "../../styles/toasts/badgeToast";
import badges from "../../assets/badges";
import StyledText from "../UIComponents/StyledText";

type Props = {
  +badge: Object
}

const BadgeToast = ( { badge }: Props ): React.Node => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate( "Achievements" )}
      style={viewStyles.row}
    >
      <View>
        <StyledText allowFontScaling={false} style={textStyles.headerText}>
          {i18n.t( badge.intlName ).toLocaleUpperCase()}
        </StyledText>
        <StyledText allowFontScaling={false} style={textStyles.description}>
          {i18n.t( "badges.you_found" )}
          {" "}
          {i18n.t( badge.infoText )}
        </StyledText>
        <StyledText allowFontScaling={false} style={textStyles.view}>{i18n.t( "banner.view" )}</StyledText>
      </View>
      <Image source={badges[badge.earnedIconName]} style={imageStyles.image} />
    </TouchableOpacity>
  );
};

export default BadgeToast;
