// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/uiComponents/whiteModal";
import BackButton from "./Buttons/ModalBackButton";

type Props = {
  +children: any,
  +closeModal?: Function,
  +noButton?: boolean,
  +width?: ?number
};

const WhiteModal = ( {
  children,
  closeModal,
  noButton,
  width
}: Props ) => (
  <>
    <View style={[styles.innerContainer, width && { width }]}>
      {children}
    </View>
    {!noButton && <BackButton closeModal={closeModal} />}
  </>
);

WhiteModal.defaultProps = {
  noButton: false,
  closeModal: () => {},
  width: null
};

export default WhiteModal;
