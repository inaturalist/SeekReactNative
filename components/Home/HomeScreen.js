// @flow

import React from "react";
import { View, ScrollView } from "react-native";

import styles from "../../styles/home/home";
import SpeciesNearby from "../../containers/SpeciesNearbyContainer";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

type Props = {
  navigation: any
}

const HomeScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.container}>
      <ScrollView>
        <SpeciesNearby />
        <View style={styles.divider} />
        <GetStarted />
      </ScrollView>
    </View>
    <Footer navigation={navigation} />
  </View>
);

export default HomeScreen;
