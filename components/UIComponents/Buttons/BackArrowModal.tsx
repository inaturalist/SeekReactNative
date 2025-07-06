import * as React from "react";
import { TouchableOpacity, Image } from "react-native";

import i18n from "../../../i18n";
import { viewStyles } from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

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
