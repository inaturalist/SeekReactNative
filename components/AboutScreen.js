// @flow

import React, { useRef, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import { getVersion, getBuildNumber } from "react-native-device-info";

import styles from "../styles/about";
import logos from "../assets/logos";
import i18n from "../i18n";
import GreenHeader from "./UIComponents/GreenHeader";
import Padding from "./UIComponents/Padding";
import SafeAreaView from "./UIComponents/SafeAreaView";
import { fetchAccessToken } from "../utility/loginHelpers";

const AboutScreen = ( { navigation }: DrawerContentComponentProps ) => {
  const [login, setLogin] = useState( false );
  const scrollView = useRef( null );
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();

  const scrollToTop = () => {
    if ( scrollView && scrollView.current !== null ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  };

  const fetchLogin = async () => {
    const isLoggedIn = await fetchAccessToken();
    if ( isLoggedIn ) {
      setLogin( isLoggedIn );
    }
  };

  useEffect( () => {
    fetchLogin();

    navigation.addListener( "willFocus", () => {
      scrollToTop();
    } );
  }, [] );

  return (
    <View style={styles.background}>
      <SafeAreaView />
      <GreenHeader header="about.header" />
      <ScrollView
        ref={scrollView}
        contentContainerStyle={styles.textContainer}
      >
        <Image source={logos.wwfop} />
        <View style={styles.margin} />
        <Text style={styles.boldText}>{i18n.t( "about.sponsored" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.our_planet" )}</Text>
        <View style={styles.block} />
        <Image source={logos.iNat} />
        <View style={styles.margin} />
        <Text style={styles.boldText}>{i18n.t( "about.seek" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.joint_initiative" )}</Text>
        <View style={styles.block} />
        <Image source={logos.casNatGeo} style={styles.image} />
        <View style={styles.margin} />
        <Text style={styles.text}>{i18n.t( "about.original" )}</Text>
        <View style={styles.margin} />
        <Image source={logos.hhmi} />
        <View style={styles.block} />
        <Text style={styles.boldText}>{i18n.t( "about.designed_by" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.inat_team" )}</Text>
        <View style={styles.block} />
        <Text style={styles.text}>{i18n.t( "about.translations" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.join_crowdin" )}</Text>
        <View style={styles.block} />
        {Platform.OS === "android" && login ? (
          <TouchableOpacity
            onPress={() => navigation.navigate( "DebugAndroid" )}
            style={styles.debug}
          >
            <Text style={styles.greenText}>
              {i18n.t( "about.version" ).toLocaleUpperCase()}
              {` ${appVersion} (${buildVersion})`}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.greenText}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {` ${appVersion} (${buildVersion})`}
          </Text>
        )}
        <View style={styles.block} />
        <Text style={styles.text}>
          {i18n.t( "about.help" )}
        </Text>
        <View style={styles.block} />
        <Padding />
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
