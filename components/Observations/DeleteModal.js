// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/observations/deleteModal";
import iconicTaxa from "../../assets/iconicTaxa";
import icons from "../../assets/icons";

type Props = {
  toggleDeleteModal: Function,
  deleteObservation: Function,
  itemToDelete: Object
};

const DeleteModal = ( {
  toggleDeleteModal,
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
    <View style={styles.innerContainer}>
      <View style={styles.flagHeaderContainer}>
        <LinearGradient
          colors={[gradientColorDark, gradientColorLight]}
          style={styles.flagHeader}
        >
          <View style={styles.flagTextContainer}>
            <Text style={[styles.buttonText, { paddingTop: 9, marginRight: 15 }]}>
              {i18n.t( "delete.header" ).toLocaleUpperCase()}
            </Text>
            <TouchableOpacity
              style={styles.flagBackButton}
              hitSlop={styles.touchable}
              onPress={() => toggleDeleteModal() }
            >
              <Image source={icons.closeWhite} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.flagContainer}>
        <View style={{ marginTop: 27 }} />
        <View style={styles.row}>
          <ImageBackground
            imageStyle={styles.image}
            style={styles.image}
            source={iconicTaxa[iconicTaxonId]}
          >
            <Image style={styles.image} source={photo} />
          </ImageBackground>
          <View style={styles.speciesNameContainer}>
            <Text style={styles.commonNameText}>
              {commonName}
            </Text>
            <Text style={styles.scientificNameText}>{scientificName}</Text>
          </View>
        </View>
        <View style={{ marginTop: 26 }} />
        <Text style={styles.text}>{i18n.t( "delete.description" )}</Text>
        <View style={{ marginTop: 16 }} />
        <TouchableOpacity
          style={styles.largeFlagButton}
          onPress={() => {
            deleteObservation( id );
            toggleDeleteModal( true );
          }}
        >
          <Text style={[styles.buttonText, { lineHeight: 24 }]}>
            {i18n.t( "delete.yes" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 16 }} />
        <TouchableOpacity
          style={[styles.flagButton, { backgroundColor: gradientColorLight }]}
          onPress={() => toggleDeleteModal()}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "delete.no" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 32 }} />
      </View>
    </View>
  );
};

export default DeleteModal;
