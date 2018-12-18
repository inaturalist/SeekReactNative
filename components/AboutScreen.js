// @flow

import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View
} from "react-native";

import styles from "../styles/about";

const AboutScreen = () => (
  <View style={{ flex: 1 }}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <ScrollView contentContainerStyle={styles.row}>
        <View style={styles.blueBox}>
          <Text style={styles.text}>Presented by</Text>
          <Image
            source={require("../assets/logos/logo-bw.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.text}>
          The Seek app was made by iNaturalist at the California Academy of Sciences and National Geographic Society with support from HHMI Tangled Bank Studios.
        </Text>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/logos/logo-cas.png")}
            style={styles.logo}
          />
          <Image
            source={require("../assets/logos/logo-natgeo.png")}
            style={styles.logo}
          />
        </View>
        <Image
          source={require("../assets/logos/logo-hhmi.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>
          This app does not generate or share citizen science data with iNaturalist nor collect, use or disclose personal information. Geolocation information used by the app is blurred so that it is not sufficient to identify street name and name of a city or town
        </Text>
        <Text style={styles.text}>Credits:</Text>
        <Text style={styles.text}>
          Designed and developed by the iNaturalist team: Yaron Budowski, Amanda Bullington, Tony Iwane, Patrick Leary, Scott Loarie, Abhas Misraraj, Carrie Seltzer, Alex Shepard, and Ken-ichi Ueda. Special thanks to Caltech, Cornell Tech, Parker Kellman, and the iNaturalist community.
        </Text>
        <Text style={[styles.text, styles.greenText]}>Version 1.0.3</Text>
        <Image
          source={require("../assets/logos/logo-inaturalist.png")}
          style={styles.logo}
        />
      </ScrollView>
    </ImageBackground>
  </View>
);

export default AboutScreen;
