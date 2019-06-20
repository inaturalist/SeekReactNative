// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/rangeMap";
import icons from "../../assets/icons";

type Props = {
  toggleModal: Function
}

const Legend = ( { toggleModal }: Props ) => (
  <SafeAreaView style={styles.safeView}>
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.legendHeader}>
          <Text style={styles.whiteText}>
            {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={{ marginTop: 7 }} />
        <View style={styles.row}>
          <Image source={icons.legendLocation} style={{ marginHorizontal: 4.5 }} />
          <Text style={styles.text}>
            {i18n.t( "species_detail.current_location" )}
          </Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.legendCamera} />
          <Text style={styles.text}>
            {i18n.t( "species_detail.obs" )}
          </Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.legendObs} />
          <Text style={styles.text}>
            {i18n.t( "species_detail.obs_inat" )}
          </Text>
        </View>
        <View style={{ marginTop: 29 }} />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => toggleModal()}>
        <Image source={icons.closeModal} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default Legend;
