// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../../styles/uiComponents/modals/whiteModal";
import BackButton from "../Buttons/ModalBackButton";

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
}: Props ) => {
  let widthStyle = null;

  if ( width ) {
    widthStyle = { width };
  }

  return (
    <>
      <View style={[styles.innerContainer, widthStyle]}>
        {children}
      </View>
      {!noButton && <BackButton closeModal={closeModal} />}
    </>
  );
};

WhiteModal.defaultProps = {
  noButton: false,
  closeModal: () => {},
  width: null
};

export default WhiteModal;
