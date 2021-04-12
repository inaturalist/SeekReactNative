// @flow

import * as React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/modals/flagModal";
import { colors } from "../../styles/global";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { removeFromCollection } from "../../utility/observationHelpers";

type Props = {
  taxon: Object,
  closeModal: Function,
  userImage: string,
  seenDate: ?string,
  scientificNames: boolean,
  commonName: ?string
};

const FlagModal = ( {
  taxon,
  closeModal,
  userImage,
  seenDate,
  scientificNames,
  commonName
}: Props ): React.Node => {
  const { scientificName } = taxon;
  const showScientificName = !commonName || scientificNames;

  const handlePress = () => {
    if ( seenDate ) {
      closeModal( true );
    } else {
      removeFromCollection( taxon.taxaId );
      closeModal( true );
    }
  };

  return (
    <ModalWithGradient
      color="gray"
      closeModal={closeModal}
      userImage={userImage}
      originalImage={( taxon && taxon.speciesSeenImage ) ? taxon.speciesSeenImage : null}
    >
      <Text allowFontScaling={false} style={[styles.speciesText, showScientificName && styles.scientificName]}>
        {showScientificName ? scientificName : commonName}
      </Text>
      <Text allowFontScaling={false} style={styles.text}>{i18n.t( "results.incorrect" )}</Text>
      <View style={styles.marginSmall} />
      <Button
        handlePress={handlePress}
        text={seenDate
          ? "results.yes_resighted"
          : "results.yes"}
        large
      />
      <View style={styles.marginSmall} />
      <Button
        handlePress={closeModal}
        text="results.no"
        color={colors.grayGradientLight}
      />
    </ModalWithGradient>
  );
};

export default FlagModal;
