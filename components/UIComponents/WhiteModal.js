// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/uiComponents/whiteModal";
import BackButton from "./ModalBackButton";

type Props = {
  +children: any,
  +closeModal: Function
};

const WhiteModal = ( { children, closeModal }: Props ) => (
  <>
    <View style={styles.innerContainer}>
      {children}
    </View>
    <BackButton closeModal={closeModal} />
  </>
);

export default WhiteModal;
