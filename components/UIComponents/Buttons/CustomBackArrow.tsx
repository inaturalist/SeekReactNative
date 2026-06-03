import * as React from "react";
import type { ViewStyle } from "react-native";
import {
  Image,
  TouchableOpacity,
} from "react-native";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { imageStyles, viewStyles } from "../../../styles/uiComponents/buttons/backArrow";

interface Props {
  readonly green?: boolean;
  handlePress: () => void;
  style: ViewStyle;
}

const CustomBackArrow = ( {
  handlePress,
  style,
  green,
}: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={handlePress}
    style={[style, viewStyles.rotateRTL]}
  >
    <Image
      source={icons.backButton}
      style={green && imageStyles.green}
    />
  </TouchableOpacity>
);

export default CustomBackArrow;
