import * as React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/modals/flagModal";
import { colors } from "../../styles/global";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { removeFromCollection } from "../../utility/observationHelpers";
import StyledText from "../UIComponents/StyledText";
import { useObservation } from "../Providers/ObservationProvider";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  taxon: {
    scientificName: string;
    taxaId: number;
    speciesSeenImage: string | null;
  };
  closeModal: ( misidentified: boolean ) => void;
  seenDate: string | null;
  scientificNames: boolean;
  commonName: string | null;
}

const FlagModal = ( {
  taxon,
  closeModal,
  seenDate,
  scientificNames,
  commonName
}: Props ) => {
  const { observation } = useObservation();
  if ( !observation ) {
    return null;
  }
  const { image } = observation;
  const { scientificName, taxaId } = taxon || {};
  const showScientificName = !commonName || scientificNames;

  const handlePress = () => {
    if ( seenDate ) {
      closeModal( true );
    } else {
      removeFromCollection( taxaId );
      closeModal( true );
    }
  };

  return (
    <ModalWithGradient
      color="gray"
      closeModal={() => closeModal( false )}
      userImage={image.uri}
      originalImage={( taxon && taxon.speciesSeenImage ) ? taxon.speciesSeenImage : null}
    >
      <StyledText allowFontScaling={false} style={[baseTextStyles.species, textStyles.speciesText, showScientificName && baseTextStyles.italic]}>
        {showScientificName ? scientificName : commonName}
      </StyledText>
      <StyledText allowFontScaling={false} style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "results.incorrect" )}</StyledText>
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
        handlePress={() => closeModal( false )}
        text="results.no"
        color={colors.grayGradientLight}
      />
    </ModalWithGradient>
  );
};

export default FlagModal;
