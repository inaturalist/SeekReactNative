import * as React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

type Props = {
  green?: boolean,
  handlePress: () => void;
  style: Object
}

const CustomBackArrow = ( {
  handlePress,
  style,
  green
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
