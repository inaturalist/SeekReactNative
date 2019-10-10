// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../../styles/uiComponents/modalBackButton";
import icons from "../../assets/icons";

type Props = {
  +toggleModal: Function
}

const ModalBackButton = ( { toggleModal }: Props ) => (
  <TouchableOpacity onPress={() => toggleModal()} style={styles.backButton}>
    <Image source={icons.closeModal} />
  </TouchableOpacity>
);

export default ModalBackButton;
