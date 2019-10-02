// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import LoadingWheel from "../UIComponents/LoadingWheel";
import Error from "./Error";
import TaxonPicker from "./TaxonPicker";
import icons from "../../assets/icons";
import { colors } from "../../styles/global";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";

type Props = {
  +taxa: Array,
  +loading: boolean,
  +navigation: any,
  +location: string,
  +updateTaxaType: Function,
  +toggleLocationPicker: Function,
  +requestAndroidPermissions: Function,
  +error: string
}

const SpeciesNearby = ( {
  taxa,
  loading,
  navigation,
  location,
  updateTaxaType,
  toggleLocationPicker,
  requestAndroidPermissions,
  error
}: Props ) => {
  let species;

  if ( loading ) {
    species = (
      <LoadingWheel color={colors.black} />
    );
  } else if ( error ) {
    species = (
      <Error
        error={error}
        requestAndroidPermissions={requestAndroidPermissions}
      />
    );
  } else {
    species = (
      <SpeciesNearbyList navigation={navigation} taxa={taxa} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, styles.header]}>
        {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => toggleLocationPicker()}
          style={styles.buttonRow}
        >
          <Image source={icons.locationWhite} style={styles.image} />
          <View style={styles.whiteButton}>
            {location
              ? <Text style={styles.buttonText}>{location.toLocaleUpperCase()}</Text>
              : <Text style={styles.buttonText}>{i18n.t( "species_nearby.no_location" ).toLocaleUpperCase()}</Text>}
          </View>
        </TouchableOpacity>
        <TaxonPicker updateTaxaType={updateTaxaType} />
      </View>
      <View style={[
        styles.speciesNearbyContainer,
        loading && styles.loading
      ]}
      >
        {species}
      </View>
    </View>
  );
};

export default SpeciesNearby;
