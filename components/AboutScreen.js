// @flow

import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";
// import { version } from "../package.json";

import styles from "../styles/about";
import logos from "../assets/logos";
import i18n from "../i18n";
import GreenHeader from "./GreenHeader";
import Padding from "./Padding";

type Props = {
  navigation: any
};

class AboutScreen extends Component<Props> {
  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  render() {
    const { navigation } = this.props;
    const version = "2.2.2";
    const buildNumber = 45;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => {
              this.scrollToTop();
            }}
          />
          <GreenHeader navigation={navigation} header={i18n.t( "about.header" )} />
          <ScrollView
            ref={( ref ) => { this.scrollView = ref; }}
            contentContainerStyle={styles.textContainer}
          >
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
        </SafeAreaView>
      </View>
    );
  }
}

export default AboutScreen;
