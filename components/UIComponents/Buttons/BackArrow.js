// @flow

import * as React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";
import { colors } from "../../../styles/global";

type Props = {
  +green?: boolean,
  +route?: ?string
}

const BackArrow = ( { green, route }: Props ): React.Node => {
  const navigation = useNavigation();
  const { name } = useRoute();

  const handlePress = ( ) => {
    if ( route ) {
      navigation.navigate( route );
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.back" )}
      accessible
      onPress={handlePress}
      style={[viewStyles.backButton, name === "ChallengeDetailsFooter" && viewStyles.challengeDetails]}
    >
      {/* $FlowFixMe */}
      <Image
        source={icons.backButton}
        tintColor={green && colors.seekForestGreen}
        style={green && imageStyles.green}
      />
    </TouchableOpacity>
  );
};

BackArrow.defaultProps = {
  green: false,
  route: null
};

export default BackArrow;
