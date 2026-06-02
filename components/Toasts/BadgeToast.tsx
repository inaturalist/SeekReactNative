import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import badges from "../../assets/badges";
import i18n from "../../i18n";
import { baseTextStyles } from "../../styles/textStyles";
import { imageStyles, textStyles, viewStyles } from "../../styles/toasts/badgeToast";
import StyledText from "../UIComponents/StyledText";

interface Props {
  readonly badge: {
    intlName: string;
    infoText: string;
    earnedIconName: string;
  };
}

const BadgeToast = ( { badge }: Props ) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate( "Achievements" )}
      style={viewStyles.row}
    >
      <View>
        <StyledText allowFontScaling={false} style={[baseTextStyles.header, textStyles.headerText]}>
          {i18n.t( badge.intlName ).toLocaleUpperCase()}
        </StyledText>
        <StyledText allowFontScaling={false} style={[baseTextStyles.body, textStyles.description]}>
          {i18n.t( "badges.you_found" )}
          {" "}
          {i18n.t( badge.infoText )}
        </StyledText>
        <StyledText allowFontScaling={false} style={[baseTextStyles.toastLink, textStyles.view]}>{i18n.t( "banner.view" )}</StyledText>
      </View>
      <Image source={badges[badge.earnedIconName]} style={imageStyles.image} />
    </TouchableOpacity>
  );
};

export default BadgeToast;
