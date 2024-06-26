import * as React from "react";
import RNModal from "react-native-modal";

interface Props {
  readonly showModal: boolean;
  readonly closeModal: () => void;
  readonly modal: React.ReactNode;
}

// accessibility might not work on Android because of backdrop
// https://github.com/react-native-modal/react-native-modal/issues/525

const Modal = ( { showModal, closeModal, modal }: Props ) => (
  <RNModal
    isVisible={showModal}
    onBackdropPress={closeModal}
    onSwipeComplete={closeModal}
    swipeDirection="down"
    useNativeDriverForBackdrop
    useNativeDriver
    // the following two lines prevent flickering
    // while modal is closing
    backdropTransitionOutTiming={0}
    hideModalContentWhileAnimating
  >
    {modal}
  </RNModal>
);

export default Modal;
