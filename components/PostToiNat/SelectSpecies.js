// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import Padding from "../Padding";

type Props = {
  toggleSpeciesModal: Function
}


class SelectSpecies extends Component<Props> {
  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  render() {
    const { toggleSpeciesModal } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <StatusBar barStyle="light-content" />
          <NavigationEvents
            onWillFocus={() => this.scrollToTop()}
          />
          <View style={styles.header}>
            <TouchableOpacity
              hitSlop={styles.touchable}
              style={styles.backButton}
              onPress={() => toggleSpeciesModal()}
            >
              <Image source={icons.backButton} />
            </TouchableOpacity>
            <Text style={styles.text}>
              {i18n.t( "posting.what_seen" ).toLocaleUpperCase()}
            </Text>
          </View>
          <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
            <View style={styles.textContainer}>
              <Text>some stuff</Text>
            </View>
            <Padding />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default SelectSpecies;
