import React from "react";
import { View } from "react-native";

import styles from "../../styles/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

const HomeScreen = () => (
  <View style={styles.container}>
    <SpeciesNearby />
    <View style={styles.divider} />
    <GetStarted />
    <Footer />
  </View>
);

export default HomeScreen;
