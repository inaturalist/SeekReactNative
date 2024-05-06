import * as React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/modalBackButton";
import icons from "../../../assets/icons";

interface Props {
  readonly closeModal: ( ) => void;
}

const ModalBackButton = ( { closeModal }: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={() => closeModal()}
    style={styles.backButton}
  >
    <Image source={icons.closeModal} />
  </TouchableOpacity>
);

export default ModalBackButton;
