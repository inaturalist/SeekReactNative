// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/modals/deleteModal";
import icons from "../../assets/icons";
import SpeciesCard from "../UIComponents/SpeciesCard";
import WhiteModal from "../UIComponents/WhiteModal";
import Button from "../UIComponents/Buttons/Button";

type Props = {
  +closeModal: Function,
  +deleteObservation: Function,
  +itemToDelete: Object
};

const DeleteModal = ( {
  closeModal,
  deleteObservation,
  itemToDelete
}: Props ) => {
  const gradientColorDark = "#404040";
  const gradientColorLight = "#5e5e5e";

  const {
    id,
    photo,
    commonName,
    scientificName,
    iconicTaxonId
  } = itemToDelete;

  return (
    <WhiteModal noButton>
      <LinearGradient
        colors={[gradientColorDark, gradientColorLight]}
        style={styles.flagHeader}
      >
        <View style={[styles.flagTextContainer, styles.row]}>
          <Text style={[styles.buttonText, styles.headerStyling]}>
            {i18n.t( "delete.header" ).toLocaleUpperCase()}
          </Text>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.flagBackButton}
          >
            <Image source={icons.closeWhite} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.margin} />
      <SpeciesCard
        commonName={commonName}
        iconicTaxonId={iconicTaxonId}
        photo={photo}
        scientificName={scientificName}
      />
      <View style={styles.margin} />
      <Text style={styles.text}>{i18n.t( "delete.description" )}</Text>
      <View style={styles.marginSmall} />
      <Button
        handlePress={() => {
          deleteObservation( id );
          closeModal( true );
        }}
        text="delete.yes"
        large
      />
      <View style={styles.marginSmall} />
      <Button
        handlePress={() => closeModal()}
        text="delete.no"
        color={gradientColorLight}
      />
      <View style={styles.marginLarge} />
    </WhiteModal>
  );
};

export default DeleteModal;
