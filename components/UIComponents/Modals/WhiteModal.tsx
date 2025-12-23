import * as React from "react";
import { View } from "react-native";

import styles from "../../../styles/uiComponents/modals/whiteModal";
import BackButton from "../Buttons/ModalBackButton";

interface Props {
  readonly children: React.ReactNode;
  readonly closeModal?: ( ) => void;
  readonly noButton?: boolean;
  readonly width?: number | null;
  readonly accessibilityLabel?: string;
}

const WhiteModal = ( {
  children,
  closeModal = () => {},
  noButton = false,
  width = null,
  accessibilityLabel,
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

export default WhiteModal;
