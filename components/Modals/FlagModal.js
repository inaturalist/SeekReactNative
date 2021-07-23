// @flow

import * as React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/modals/flagModal";
import { colors } from "../../styles/global";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { removeFromCollection } from "../../utility/observationHelpers";
import { ObservationContext } from "../UserContext";

type Props = {
  taxon: Object,
  closeModal: Function,
  seenDate: ?string,
  scientificNames: boolean,
  commonName: ?string
};

const FlagModal = ( {
  taxon,
  closeModal,
  seenDate,
  scientificNames,
  commonName
}: Props ): React.Node => {
  const { observation } = React.useContext( ObservationContext );
  const { image } = observation;
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
      userImage={image.uri}
      originalImage={( taxon && taxon.speciesSeenImage ) ? taxon.speciesSeenImage : null}
    >
      <Text allowFontScaling={false} style={[textStyles.speciesText, showScientificName && textStyles.scientificName]}>
        {showScientificName ? scientificName : commonName}
      </Text>
      <Text allowFontScaling={false} style={textStyles.text}>{i18n.t( "results.incorrect" )}</Text>
      <View style={viewStyles.marginSmall} />
      <Button
        handlePress={handlePress}
        text={seenDate
          ? "results.yes_resighted"
          : "results.yes"}
        large
      />
      <View style={viewStyles.marginSmall} />
      <Button
        handlePress={closeModal}
        text="results.no"
        color={colors.grayGradientLight}
      />
    </ModalWithGradient>
  );
};

export default FlagModal;
