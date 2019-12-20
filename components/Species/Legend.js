// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/rangeMap";
import icons from "../../assets/icons";
import BackButton from "../UIComponents/ModalBackButton";

type Props = {
  +closeModal: Function
}

const Legend = ( { closeModal }: Props ) => (
  <>
    <View style={styles.legendHeader}>
      <Text style={styles.whiteText}>
        {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
      </Text>
    </View>
    <View style={styles.innerContainer}>
      <View style={styles.marginSmall} />
      <View style={styles.row}>
        <Image source={icons.legendLocation} style={styles.marginHorizontal} />
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
      <View style={styles.marginLarge} />
    </View>
    <BackButton toggleModal={closeModal} />
  </>
);

export default Legend;
