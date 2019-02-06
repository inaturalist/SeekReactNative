// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import Realm from "realm";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import logos from "../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import ChallengeBadge from "../Badges/ChallengeModal";
import Footer from "./ChallengeFooter";
import { startChallenge } from "../../utility/challengeHelpers";

type Props = {
  navigation: any
}

class ChallengeDetailsScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const { index } = navigation.state.params;

    this.state = {
      challenge: {},
      missions: {},
      challengeStarted: false,
      modalVisible: false,
      index
    };
  }

  componentDidMount() {
    this.fetchChallengeDetails();
  }

  fetchChallengeDetails() {
    const { index } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${index}` );
        const challenge = challenges[0];
        const missionList = Object.keys( challenge.missions ).map( mission => challenge.missions[mission] );
        const observationsList = Object.keys( challenge.numbersObserved ).map( number => challenge.numbersObserved[number] );

        const missions = [];

        missionList.forEach( ( mission, i ) => {
          missions.push( {
            mission,
            observations: observationsList[i]
          } );
        } );

        this.setState( {
          challenge: {
            month: i18n.t( challenge.month ).toLocaleUpperCase(),
            name: i18n.t( challenge.name ).toLocaleUpperCase(),
            description: i18n.t( challenge.description ),
            started: challenge.started,
            percentComplete: challenge.percentComplete
          },
          missions,
          challengeStarted: challenge.started
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  showMission() {
    const { index } = this.state;

    startChallenge( index );
    this.fetchChallengeDetails();
  }

  toggleBadgeModal() {
    const { modalVisible } = this.state;

    this.setState( {
      modalVisible: !modalVisible
    } );
  }

  render() {
    const {
      challengeStarted,
      modalVisible,
      challenge,
      missions
    } = this.state;
    const { navigation } = this.props;

    let button;

    if ( !challengeStarted ) {
      button = (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => this.showMission()}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.start_challenge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    } else if ( challengeStarted && challenge.percentComplete < 100 ) {
      button = (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate( "Camera" )}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.open_camera" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    } else if ( challengeStarted && challenge.percentComplete === 100 ) {
      button = (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => this.toggleBadgeModal()}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.view_badge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.container, modalVisible && styles.modalContainer]}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <Modal
            transparent
            visible={modalVisible}
            onRequestClose={() => this.toggleBadgeModal()}
          >
            <View style={styles.modalView}>
              <ChallengeBadge />
              <TouchableOpacity
                onPress={() => this.toggleBadgeModal()}
                style={styles.backButton}
              >
                <Image source={icons.backButton} />
              </TouchableOpacity>
            </View>
          </Modal>
          {!modalVisible ? (
            <ScrollView>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Image source={icons.backButton} />
                </TouchableOpacity>
                <Image style={styles.logo} source={logos.op} />
                <View />
              </View>
              <View style={styles.challengeContainer}>
                <Text style={styles.challengeHeader}>{challenge.month}</Text>
                <Text style={styles.challengeName}>{challenge.name}</Text>
                <View style={styles.row}>
                  <Image source={icons.badgePlaceholder} />
                  <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
                </View>
                {button}
              </View>
              <View style={styles.missionContainer}>
                {challengeStarted ? (
                  <ChallengeMissionCard
                    challenge={challenge}
                    missions={missions}
                  />
                ) : null}
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{challenge.description}</Text>
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
          ) : null}
          {!modalVisible ? <Footer navigation={navigation} /> : null}
        </SafeAreaView>
      </View>
    );
  }
}

export default ChallengeDetailsScreen;
