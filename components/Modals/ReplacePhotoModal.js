// @flow

import React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import styles from "../../styles/modals/flagModal";
import Button from "../UIComponents/Buttons/Button";
import ModalWithGradient from "../UIComponents/Modals/ModalWithGradient";
import { replacePhoto } from "../../utility/photoHelpers";
import { useSeenTaxa, useUserPhoto } from "../../utility/customHooks";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";

type Props = {
  +closeModal: Function,
  +image: Object,
  +speciesText?: ?string,
  +seenDate: string,
  +taxaId: number
};

const ReplacePhotoModal = ( {
  closeModal,
  image,
  speciesText,
  seenDate,
  taxaId
}: Props ) => {
  const seenTaxa = useSeenTaxa( taxaId );
  const currentUserPhoto = useUserPhoto( seenTaxa );

  if ( !currentUserPhoto ) {
    return null;
  }

  const { taxon } = seenTaxa;
  const { defaultPhoto } = taxon;

  const displayDate = ( defaultPhoto && defaultPhoto.lastUpdated )
    ? formatShortMonthDayYear( defaultPhoto.lastUpdated )
    : seenDate;

  return (
    <ModalWithGradient
      color="green"
      closeModal={closeModal}
      userImage={image.uri}
      originalImage={currentUserPhoto.uri}
      displayDate={displayDate}
    >
      <Text allowFontScaling={false} style={styles.speciesText}>{speciesText}</Text>
      <Text allowFontScaling={false} style={styles.text}>{i18n.t( "replace_photo.description" )}</Text>
      <View style={styles.marginMedium} />
      <Button
        handlePress={() => {
          replacePhoto( taxaId, image );
          closeModal( true );
        }}
        text="replace_photo.new"
        color={colors.seekForestGreen}
      />
      <View style={styles.marginSmall} />
      <Button
        handlePress={() => closeModal()}
        text="replace_photo.old"
        color={colors.grayGradientLight}
      />
    </ModalWithGradient>
  );
};

ReplacePhotoModal.defaultProps = {
  speciesText: null
};

export default ReplacePhotoModal;
