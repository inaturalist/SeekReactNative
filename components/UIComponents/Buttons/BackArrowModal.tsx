import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { viewStyles } from "../../../styles/uiComponents/buttons/backArrow";

interface Props {
  handlePress: () => void;
}

const BackArrowModal = ( { handlePress }: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={handlePress}
    style={viewStyles.backButton}
  >
    <Image source={icons.backButton} />
  </TouchableOpacity>
);

export default BackArrowModal;
