// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/getStarted";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/GreenButton";
import DescriptionText from "../UIComponents/DescriptionText";

type Props = {
  +toggleGetStartedModal: Function
}

const GetStarted = ( { toggleGetStartedModal }: Props ) => (
  <View style={styles.container}>
    <View style={styles.headerMargin}>
      <GreenText text={i18n.t( "get_started.header" ).toLocaleUpperCase()} />
    </View>
    <View style={styles.marginTop} />
    <View style={[styles.row, styles.margin]}>
      <Image source={icons.cameraGreen} style={styles.image} />
      <View style={styles.textContainer}>
        <DescriptionText text={i18n.t( "get_started.tip_1" )} />
      </View>
    </View>
    <View style={styles.marginMiddle} />
    <View style={[styles.row, styles.margin]}>
      <Image source={icons.speciesNearby} style={styles.image} />
      <View style={styles.textContainer}>
        <DescriptionText text={i18n.t( "get_started.tip_2" )} />
      </View>
    </View>
    <View style={styles.marginMiddle} />
    <View style={[styles.row, styles.margin]}>
      <Image source={icons.birdBadge} style={styles.image} />
      <View style={styles.textContainer}>
        <DescriptionText text={i18n.t( "get_started.tip_3" )} />
      </View>
    </View>
    <View style={styles.button}>
      <GreenButton
        handlePress={() => toggleGetStartedModal()}
        text={i18n.t( "onboarding.continue" ).toLocaleUpperCase()}
      />
    </View>
  </View>
);

export default GetStarted;
