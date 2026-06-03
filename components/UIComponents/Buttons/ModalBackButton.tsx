import * as React from "react";
import {
  Image,
  TouchableOpacity,
} from "react-native";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/modalBackButton";

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
