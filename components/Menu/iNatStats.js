// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import inatjs from "inaturalistjs";

import styles from "../../styles/menu/iNatStats";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import logos from "../../assets/logos";
import Footer from "../Home/Footer";

type Props = {
  navigation: any
}

class iNatStatsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      globalObservations: null,
      naturalistsWorldwide: null
    };
  }

  componentDidMount() {
    this.fetchTotalObservations();
    this.fetchTotalObservers();
  }

  fetchTotalObservations() {
    inatjs.observations.fetch().then( ( response ) => {
      this.setState( {
        globalObservations: response.total_results
      } );
    } ).catch( () => {
      // catch error here
    } );
  }

  fetchTotalObservers() {
    inatjs.observations.observers().then( ( response ) => {
      this.setState( {
        naturalistsWorldwide: response.total_results
      } );
    } ).catch( () => {
      // catch error here
    } );
  }

  render() {
    const { globalObservations, naturalistsWorldwide } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.backButton}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Image style={styles.logo} source={logos.iNat} />
              <View />
            </View>
            <View style={styles.missionContainer}>
              <Text style={styles.numberText}>
                {globalObservations}
              </Text>
              <Image source={logos.bird} style={styles.iNatLogo} />
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.global_observations" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.numberText}>
                {naturalistsWorldwide}
              </Text>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.naturalists_worldwide" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.missionHeaderText}>
                {i18n.t( "inat_stats.seek_data" )}
              </Text>
              <Text style={styles.missionText}>
                {i18n.t( "inat_stats.about_inat" )}
              </Text>
              <Text style={styles.italicText}>
                {i18n.t( "inat_stats.contribute" )}
              </Text>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate( "Login" )}
              >
                <Text style={styles.buttonText}>{i18n.t( "inat_stats.join" )}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default iNatStatsScreen;
