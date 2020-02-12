// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/uiComponents/whiteModal";
import BackButton from "./ModalBackButton";

type Props = {
  +children: any,
  +closeModal?: Function,
  +noButton?: boolean
};

const WhiteModal = ( { children, closeModal, noButton }: Props ) => (
  <>
    <View style={styles.innerContainer}>
      {children}
    </View>
    {!noButton && <BackButton closeModal={closeModal} />}
  </>
);

WhiteModal.defaultProps = {
  noButton: false,
  closeModal: () => {}
};

export default WhiteModal;
