import * as React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import { viewStyles, textStyles } from "../../styles/modals/flagModal";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { replacePhoto } from "../../utility/photoHelpers";
import { useSeenTaxa } from "../../utility/customHooks/useSeenTaxa";
import { useUserPhoto } from "../../utility/customHooks/useUserPhoto";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import { useObservation } from "../Providers/ObservationProvider";

interface Props {
  closeModal: () => void;
  seenDate: string;
  taxon: {
    taxaId: number;
    scientificName: string;
  };
  scientificNames: boolean;
  commonName: string | null;
}

const ReplacePhotoModal = ( {
  closeModal,
  seenDate,
  taxon,
  scientificNames,
  commonName,
}: Props ) => {
  const { observation } = useObservation();
  const { taxaId, scientificName } = taxon;
  const seenTaxa = useSeenTaxa( taxaId );
  const currentUserPhoto = useUserPhoto( seenTaxa );

  if ( !observation || !seenTaxa ) {
    return null;
  }

  const { image } = observation;
  const showScientificName = !commonName || scientificNames;
  const { defaultPhoto } = seenTaxa.taxon;

  const displayDate = ( defaultPhoto && defaultPhoto.lastUpdated )
    ? formatShortMonthDayYear( defaultPhoto.lastUpdated )
    : seenDate;

  const setNewPhoto = ( ) => {
    replacePhoto( taxaId, image );
    closeModal( );
  };

  return (
    <ModalWithGradient
      color="green"
      closeModal={closeModal}
      userImage={image.uri}
      originalImage={currentUserPhoto ? currentUserPhoto.uri : null}
      displayDate={displayDate}
    >
      <StyledText allowFontScaling={false} style={[baseTextStyles.species, textStyles.speciesText, showScientificName && baseTextStyles.italic]}>
        {showScientificName ? scientificName : commonName}
      </StyledText>
      <StyledText allowFontScaling={false} style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "replace_photo.description" )}</StyledText>
      <View style={viewStyles.marginMedium} />
      <Button
        testID="replacePhoto"
        handlePress={setNewPhoto}
        text="replace_photo.new"
        color={colors.seekForestGreen}
      />
      <View style={viewStyles.marginSmall} />
      <Button
        handlePress={closeModal}
        text="replace_photo.old"
        color={colors.grayGradientLight}
      />
    </ModalWithGradient>
  );
};

export default ReplacePhotoModal;
