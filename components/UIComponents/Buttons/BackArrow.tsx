import * as React from "react";
import {
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

interface Props {
  readonly green?: boolean;
  readonly route?: string | null;
}

const BackArrow = ( { green = false, route = null }: Props ) => {
  const navigation = useNavigation();
  const { name } = useRoute();

  const handlePress = ( ) => {
    if ( route ) {
      navigation.popTo( route );
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

export default BackArrow;
