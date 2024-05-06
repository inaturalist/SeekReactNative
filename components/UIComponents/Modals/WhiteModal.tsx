import * as React from "react";
import { View } from "react-native";

import styles from "../../../styles/uiComponents/modals/whiteModal";
import BackButton from "../Buttons/ModalBackButton";

interface Props {
  readonly children: React.ReactNode;
  readonly closeModal: ( ) => void;
  readonly noButton?: boolean;
  readonly width?: number | null;
  readonly accessibilityLabel?: string;
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
