// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

type Props = {
  +green?: boolean,
  +route?: ?string
}

const BackArrow = ( { green, route }: Props ) => {
  const navigation = useNavigation();
  const { name } = useRoute();

  return (
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.back" )}
      accessible
      onPress={() => {
        if ( route ) {
          navigation.navigate( route );
        } else {
          navigation.goBack();
        }
      }}
      style={[styles.backButton, name === "ChallengeDetails" && styles.challengeDetails]}
    >
      <Image source={green ? icons.backButtonGreen : icons.backButton} />
    </TouchableOpacity>
  );
};

BackArrow.defaultProps = {
  green: false,
  route: null
};

export default BackArrow;
