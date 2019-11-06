// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/camera/warning";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/GreenButton";

type Props = {
  +toggleWarningModal: Function
}

const WarningModal = ( { toggleWarningModal }: Props ) => (
  <View style={styles.innerContainer}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "warning.remember" ).toLocaleUpperCase()}
      </Text>
    </View>
    <View style={styles.contentContainer}>
      <View style={styles.row}>
        <Image source={icons.warningTrespass} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "warning.tip_1" )}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image source={icons.warningEat} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "warning.tip_2" )}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image source={icons.warningTouch} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "warning.tip_3" )}
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <GreenButton
          handlePress={() => toggleWarningModal()}
          text={i18n.t( "onboarding.continue" )}
        />
      </View>
    </View>
  </View>
);

export default WarningModal;
