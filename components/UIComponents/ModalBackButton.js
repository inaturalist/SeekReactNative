// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/modalBackButton";
import icons from "../../assets/icons";

type Props = {
  +toggleModal: Function
}

const ModalBackButton = ( { toggleModal }: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={() => toggleModal()}
    style={styles.backButton}
  >
    <Image source={icons.closeModal} />
  </TouchableOpacity>
);

export default ModalBackButton;
