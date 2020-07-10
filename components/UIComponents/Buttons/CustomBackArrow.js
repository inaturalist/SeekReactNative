// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

type Props = {
  handlePress: Function,
  style: Object
}

const CustomBackArrow = ( {
  handlePress,
  style
}: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={() => handlePress()}
    style={[style, styles.rotateRTL]}
  >
    <Image source={icons.backButton} />
  </TouchableOpacity>
);

export default CustomBackArrow;
