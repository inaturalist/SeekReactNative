// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import badges from "../../assets/badges";
import BackArrow from "../UIComponents/BackArrow";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import ChallengeMissionCard from "./ChallengeMissionCard";
import ChallengeEarnedModal from "../AchievementModals/ChallengeEarnedModal";
import Padding from "../UIComponents/Padding";
import { startChallenge, getChallengeIndex, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";

type Props = {
  +navigation: any
}

class ChallengeDetailsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      challenge: {},
      missions: {},
      challengeStarted: false,
      showChallengeModal: false,
      index: null
    };

    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
  }

  resetState() {
    this.setState( {
      challenge: {},
      missions: {},
      challengeStarted: false,
      showChallengeModal: false,
      index: null
    } );
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  async fetchChallengeIndex() {
    const index = await getChallengeIndex();
    this.setState( { index }, () => {
      this.fetchChallengeDetails();
    } );
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
            name: challenge.name,
            description: i18n.t( challenge.description ),
            earnedIconName: challenge.earnedIconName,
            started: challenge.started,
            percentComplete: challenge.percentComplete,
            backgroundName: challenge.backgroundName,
            photographer: challenge.photographer,
            action: challenge.action,
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
          onPress={() => this.showMission()}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.start_challenge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    } else if ( challengeStarted && challenge.percentComplete < 100 ) {
      button = (
        <TouchableOpacity
          onPress={() => navigation.navigate( "Camera" )}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.open_camera" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    } else if ( challengeStarted && challenge.percentComplete === 100 ) {
      button = (
        <TouchableOpacity
          onPress={() => this.toggleChallengeModal()}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>{i18n.t( "challenges.view_badge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
        <SafeAreaView style={styles.safeViewTop} />
        <StatusBar barStyle="light-content" />
        <NavigationEvents
          onWillBlur={() => this.resetState()}
          onWillFocus={() => {
            this.scrollToTop();
            recalculateChallenges();
            this.fetchChallengeIndex();
          }}
        />
        <Modal
          isVisible={showChallengeModal}
          onBackdropPress={() => this.toggleChallengeModal()}
          onSwipeComplete={() => this.toggleChallengeModal()}
          swipeDirection="down"
        >
          <ChallengeEarnedModal
            challenge={challenge}
            toggleChallengeModal={this.toggleChallengeModal}
          />
        </Modal>
        {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
        <ImageBackground
          source={backgrounds[challenge.backgroundName]}
          style={styles.challengeBackground}
        >
          <BackArrow navigation={navigation} />
          <Image source={logos.op} style={styles.logo} />
          <View style={{ marginTop: 24 }} />
          <Text style={styles.challengeHeader}>
            {i18n.t( challenge.month ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.challengeName}>
            {i18n.t( challenge.name ).toLocaleUpperCase()}
          </Text>
          <View style={[styles.row, styles.marginHorizontal]}>
            {challenge.percentComplete === 100
              ? <Image source={badges[challenge.earnedIconName]} style={styles.badge} />
              : <Image source={badges["badge-empty-white"]} style={styles.badge} />}
            <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
          </View>
          {button}
        </ImageBackground>
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
        </View>
        <View style={styles.secondHeader}>
          <Text style={styles.headerText}>{i18n.t( "challenges.get_involved" ).toLocaleUpperCase()}</Text>
        </View>
        <View style={{ marginTop: 16 }} />
        <Text style={[styles.descriptionText, styles.marginHorizontal]}>
          {i18n.t( challenge.action )}
        </Text>
        <View style={styles.descriptionContainer}>
          <View style={styles.row}>
            <Image source={logos.wwfop} />
          </View>
          <Text style={styles.photographerText}>{i18n.t( challenge.photographer )}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate( "Challenges" )}
          >
            <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
          </TouchableOpacity>
        </View>
        <Padding />
      </ScrollView>
    );
  }
}

export default ChallengeDetailsScreen;
