// @flow

import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView
} from "react-native";

import styles from "../../styles/menu/about";
import logos from "../../assets/logos";
import i18n from "../../i18n";
import GreenHeader from "../GreenHeader";
import Padding from "../Padding";
import Footer from "../Home/Footer";

type Props = {
  navigation: any
};

const AboutScreen = ( { navigation }: Props ) => {
  const version = "2.0.1";
  const buildNumber = 21;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeViewTop} />
      <SafeAreaView style={styles.safeView}>
        <GreenHeader navigation={navigation} header={i18n.t( "about.header" )} />
        <ScrollView contentContainerStyle={styles.textContainer}>
          <View style={styles.row}>
            <Image source={logos.opBlack} />
            <Image style={{ marginLeft: 20 }} source={logos.wwf} />
          </View>
          <View style={styles.block}>
            <Text style={styles.boldText}>{i18n.t( "about.sponsored" )}</Text>
            <Text style={styles.text}>{i18n.t( "about.our_planet" )}</Text>
          </View>
          <View style={styles.row}>
            <Image source={logos.iNat} />
          </View>
          <View style={styles.block}>
            <Text style={styles.boldText}>{i18n.t( "about.seek" )}</Text>
            <Text style={styles.text}>{i18n.t( "about.joint_initiative" )}</Text>
          </View>
          <View style={styles.row}>
            <Image style={styles.image} source={logos.casNatGeo} />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>{i18n.t( "about.original" )}</Text>
          </View>
          <View style={styles.block}>
            <Image source={logos.hhmi} />
          </View>
          <View style={styles.block}>
            <Text style={styles.boldText}>{i18n.t( "about.designed_by" )}</Text>
            <Text style={styles.text}>{i18n.t( "about.inat_team" )}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.greenText}>
              {i18n.t( "about.version" ).toLocaleUpperCase()}
              {` ${version} (${buildNumber})`}
            </Text>
          </View>
          <Padding />
        </ScrollView>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </View>
  );
}

export default AboutScreen;
