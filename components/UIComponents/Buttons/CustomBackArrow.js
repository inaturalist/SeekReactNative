// @flow

import * as React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";
import { colors } from "../../../styles/global";

type Props = {
  +green?: boolean,
  handlePress: Function,
  style: Object
}

const CustomBackArrow = ( {
  handlePress,
  style,
  green
}: Props ): React.Node => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={handlePress}
    style={[style, viewStyles.rotateRTL]}
  >
    {/* $FlowFixMe */}
    <Image
      source={icons.backButton}
      tintColor={green && colors.seekForestGreen}
      style={green && imageStyles.green}
    />
  </TouchableOpacity>
);

export default CustomBackArrow;
