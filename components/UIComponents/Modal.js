// @flow
import React from "react";
import RNModal from "react-native-modal";

type Props = {
  +showModal: boolean,
  +closeModal: Function,
  +modal: React.Element
}

const Modal = ( { showModal, closeModal, modal }: Props ) => (
  <RNModal
    isVisible={showModal}
    onBackdropPress={() => closeModal()}
    onSwipeComplete={() => closeModal()}
    swipeDirection="down"
  >
    {modal}
  </RNModal>
);

export default Modal;
