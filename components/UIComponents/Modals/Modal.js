// @flow
import * as React from "react";
import RNModal from "react-native-modal";

type Props = {
  +showModal: boolean,
  +closeModal: Function,
  +modal: any
}

// accessibility might not work on Android because of backdrop
// https://github.com/react-native-modal/react-native-modal/issues/525

const Modal = ( { showModal, closeModal, modal }: Props ): React.Node => (
  <RNModal
    isVisible={showModal}
    onBackdropPress={closeModal}
    onSwipeComplete={closeModal}
    swipeDirection="down"
    useNativeDriverForBackdrop
    useNativeDriver
  >
    {modal}
  </RNModal>
);

export default Modal;
