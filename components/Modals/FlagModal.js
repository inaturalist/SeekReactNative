// @flow

import React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/modals/flagModal";
import { colors } from "../../styles/global";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { removeFromCollection } from "../../utility/observationHelpers";

type Props = {
  +taxon: Object,
  +closeModal: Function,
  +userImage: string,
  +speciesText: ?string,
  +seenDate: ?string
};

const FlagModal = ( {
  taxon,
  closeModal,
  userImage,
  speciesText,
  seenDate
}: Props ) => (
  <ModalWithGradient
    color="gray"
    closeModal={closeModal}
    userImage={userImage}
    originalImage={taxon && taxon.speciesSeenImage ? taxon.speciesSeenImage : null}
  >
    <Text allowFontScaling={false} style={styles.speciesText}>{speciesText}</Text>
    <Text allowFontScaling={false} style={styles.text}>{i18n.t( "results.incorrect" )}</Text>
    <View style={styles.marginSmall} />
    <Button
      handlePress={() => {
        if ( seenDate ) {
          closeModal( true );
        } else {
          removeFromCollection( taxon.taxaId );
          closeModal( true );
        }
      }}
      text={seenDate
        ? "results.yes_resighted"
        : "results.yes"}
      large
    />
    <View style={styles.marginSmall} />
    <Button
      handlePress={() => closeModal()}
      text="results.no"
      color={colors.grayGradientLight}
    />
  </ModalWithGradient>
);

export default FlagModal;
