// @flow
import * as React from "react";
import RNModal from "react-native-modal";

type Props = {
  +showModal: boolean,
  +closeModal: Function,
  +modal: any
}

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
