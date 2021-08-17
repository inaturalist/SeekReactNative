// @flow

import * as React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import { viewStyles, textStyles } from "../../styles/modals/flagModal";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { replacePhoto } from "../../utility/photoHelpers";
import { useSeenTaxa, useUserPhoto } from "../../utility/customHooks";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";
import { ObservationContext } from "../UserContext";

type Props = {
  closeModal: Function,
  seenDate: string,
  taxon: Object,
  scientificNames: boolean,
  commonName: ?string
};

const ReplacePhotoModal = ( {
  closeModal,
  seenDate,
  taxon,
  scientificNames,
  commonName
}: Props ): React.Node => {
  const { observation } = React.useContext( ObservationContext );
  const { image } = observation;
  const { taxaId, scientificName } = taxon;
  const seenTaxa = useSeenTaxa( taxaId );
  const currentUserPhoto = useUserPhoto( seenTaxa );
  const showScientificName = !commonName || scientificNames;

  if ( !seenTaxa ) {
    return null;
  }

  const { defaultPhoto } = seenTaxa.taxon;

  const displayDate = ( defaultPhoto && defaultPhoto.lastUpdated )
    ? formatShortMonthDayYear( defaultPhoto.lastUpdated )
    : seenDate;

  const setNewPhoto = ( ) => {
    replacePhoto( taxaId, image );
    closeModal( true );
  };

  return (
    <ModalWithGradient
      color="green"
      closeModal={closeModal}
      userImage={image.uri}
      originalImage={currentUserPhoto ? currentUserPhoto.uri : null}
      displayDate={displayDate}
    >
      <Text allowFontScaling={false} style={[textStyles.speciesText, showScientificName && textStyles.scientificName]}>
        {showScientificName ? scientificName : commonName}
      </Text>
      <Text allowFontScaling={false} style={textStyles.text}>{i18n.t( "replace_photo.description" )}</Text>
      <View style={viewStyles.marginMedium} />
      <Button
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
