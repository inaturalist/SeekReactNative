// @flow

import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View
} from "react-native";

import styles from "../../styles/menu/about";
import logos from "../../assets/logos";
import i18n from "../../i18n";

const AboutScreen = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{i18n.t( "about.header" )}</Text>
    </View>
    <ScrollView contentContainerStyle={styles.textContainer}>
      <Image style={styles.image} source={logos.wwfop} />
      <View>
        <Text style={styles.boldText}>{i18n.t( "about.sponsored" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.our_planet" )}</Text>
      </View>
      <Image style={styles.image} source={logos.iNat} />
      <View>
        <Text style={styles.boldText}>{i18n.t( "about.seek" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.joint_initiative" )}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={logos.cas} />
        <Image style={styles.image} source={logos.natGeo} />
      </View>
    </ScrollView>
  </View>
);

export default AboutScreen;
