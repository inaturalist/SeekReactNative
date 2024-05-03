import * as React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

type Props = {
  green?: boolean;
  route?: string;
}

const BackArrow = ( { green, route }: Props ) => {
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
      style={[viewStyles.backButton, name === "ChallengeDetails" && viewStyles.challengeDetails]}
    >
      <Image
        source={icons.backButton}
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
