import * as React from "react";
import { View } from "react-native";

import styles from "../../../styles/uiComponents/modals/whiteModal";
import BackButton from "../Buttons/ModalBackButton";

interface Props {
  children: React.ReactNode;
  closeModal: ( ) => void;
  noButton?: boolean;
  width?: number;
  accessibilityLabel?: string;
}

const WhiteModal = ( {
  children,
  closeModal,
  noButton,
  width,
  accessibilityLabel
}: Props ) => {
  let widthStyle = null;

  if ( width ) {
    widthStyle = { width };
  }

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
    >
      <View style={[styles.innerContainer, widthStyle]}>
        {children}
      </View>
      {!noButton && <BackButton closeModal={closeModal} />}
    </View>
  );
};

WhiteModal.defaultProps = {
  noButton: false,
  closeModal: () => {},
  width: null
};

export default WhiteModal;
