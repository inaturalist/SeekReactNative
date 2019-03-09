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

const AboutScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <GreenHeader navigation={navigation} header={i18n.t( "about.header" )} />
      <ScrollView contentContainerStyle={styles.textContainer}>
        <View style={styles.row}>
          <Image style={styles.image} source={logos.opBlack} />
          <Image style={[styles.image, { marginLeft: 20 }]} source={logos.wwf} />
        </View>
        <View style={styles.block}>
          <Text style={styles.boldText}>{i18n.t( "about.sponsored" )}</Text>
          <Text style={styles.text}>{i18n.t( "about.our_planet" )}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.image} source={logos.iNat} />
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
          <Image style={styles.image} source={logos.hhmi} />
        </View>
        <View style={styles.block}>
          <Text style={styles.boldText}>{i18n.t( "about.designed_by" )}</Text>
          <Text style={styles.text}>{i18n.t( "about.inat_team" )}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.greenText}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {" 2.0.0 (11)"}
          </Text>
        </View>
        <Padding />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  </View>
);

export default AboutScreen;
