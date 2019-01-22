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

import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import logos from "../../assets/logos";
import Footer from "../Home/Footer";

type Props = {
  navigation: any
}

class ChallengeDetailsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      challengeStarted: false
    };

    this.startChallenge = this.startChallenge.bind( this );
  }

  startChallenge() {
    this.setState( {
      challengeStarted: true
    } );
  }

  render() {
    const { challengeStarted } = this.state;
    const { navigation } = this.props;

    let button;

    if ( !challengeStarted ) {
      button = (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => this.startChallenge()}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.start_challenge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    } else if ( challengeStarted ) {
      button = (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate( "Camera", {
            latitude: 0.0,
            longitude: 0.0,
            id: null,
            commonName: null
          } )}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.open_camera" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

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
              <Image style={styles.logo} source={logos.op} />
              <View />
            </View>
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeHeader}>
                {i18n.t( "challenges.april_2019" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.challengeName}>
                {i18n.t( "challenges.connectivity" ).toLocaleUpperCase()}
              </Text>
              <View style={styles.row}>
                <Image source={icons.badgePlaceholder} />
                <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
              </View>
              {button}
            </View>
            <View style={styles.missionContainer}>
              <Text style={styles.missionText}>
                {i18n.t( "challenges.april_description" )}
              </Text>
              <View style={styles.row}>
                <Image source={logos.wwfop} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate( "Challenges" )}
              >
                <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default ChallengeDetailsScreen;
