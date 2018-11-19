// @flow

import React from "react";

import {
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import Banner from "../Banner";
import styles from "../../styles/challenges";

type Props = {
  navigation: any,
  speciesSeen: ?boolean,
  bannerText: string,
  latitude: number,
  loading: boolean,
  longitude: number,
  location: string,
  setTaxonId: Function,
  taxaType: string,
  updateLocation: Function,
  reverseGeocodeLocation: Function
}

const ChallengeHeader = ( {
  navigation,
  speciesSeen,
  bannerText,
  latitude,
  loading,
  longitude,
  location,
  setTaxonId,
  taxaType,
  updateLocation
}: Props ) => (
  <View style={styles.header}>
    { speciesSeen ? (
      <View style={styles.banner}>
        <Image
          source={require( "../../assets/results/icn-results-match.png" )}
          style={styles.bannerImage}
        />
        <Banner bannerText={bannerText} main />
      </View>
    ) : null
    }
    <Text style={styles.headerText}>Species you&apos;re most likely to see near: </Text>
    <TouchableOpacity
      style={styles.locationChooser}
      onPress={() => navigation.navigate( "Location", {
        location,
        latitude,
        longitude,
        updateLocation
      } )}
    >
      { loading ? (
        <Text style={styles.locationChooserText}>Loading...</Text>
      ) : (
        <Text style={styles.locationChooserText}>{location} &#9660;</Text>
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.taxonChooser}
      onPress={() => navigation.navigate( "Taxon", { setTaxonId } )}
    >
      <Text style={styles.taxonChooserText}>{taxaType} &#9660;</Text>
    </TouchableOpacity>
  </View>
);

export default ChallengeHeader;
