// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  // Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import logos from "../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import ChallengeModal from "../Badges/ChallengeModal";
import Footer from "./ChallengeFooter";
import Padding from "../Padding";
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
      showChallengeModal: false,
      index
    };

    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
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
            month: challenge.month,
            name: i18n.t( challenge.name ).toLocaleUpperCase(),
            description: i18n.t( challenge.description ),
            earnedIconName: challenge.earnedIconName,
            started: challenge.started,
            percentComplete: challenge.percentComplete,
            index: challenge.index
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

  toggleChallengeModal() {
    const { showChallengeModal } = this.state;

    this.setState( {
      showChallengeModal: !showChallengeModal
    } );
  }

  render() {
    const {
      challengeStarted,
      showChallengeModal,
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
          onPress={() => this.toggleChallengeModal()}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.view_badge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <Modal
            isVisible={showChallengeModal}
            onSwipe={() => this.toggleChallengeModal()}
            onBackdropPress={() => this.toggleChallengeModal()}
            swipeDirection="down"
          >
            <ChallengeModal
              challenge={challenge}
              toggleChallengeModal={this.toggleChallengeModal}
            />
          </Modal>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Image source={icons.backButton} style={styles.image} />
              </TouchableOpacity>
              <Image style={styles.logo} source={logos.op} />
            </View>
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeHeader}>{i18n.t( challenge.month ).toLocaleUpperCase()}</Text>
              <Text style={styles.challengeName}>{challenge.name}</Text>
              <View style={styles.leftRow}>
                {challenge.percentComplete === 100
                  ? <Image source={icons.badgePlaceholder} />
                  : <Image source={badges["badge-empty-white"]} style={{ width: 83, height: 83, resizeMode: "contain" }} />
                }
                
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
            <Padding />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default ChallengeDetailsScreen;
