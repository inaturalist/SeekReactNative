// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

type Props = {
  navigation: any
}

const HomeScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SpeciesNearby />
    <View style={styles.divider} />
    <GetStarted />
    <Footer navigation={navigation} />
  </View>
);

export default HomeScreen;
