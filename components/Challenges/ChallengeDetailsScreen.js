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
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import badges from "../../assets/badges";
import CustomBackArrow from "../UIComponents/CustomBackArrow";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import ChallengeMissionCard from "./ChallengeMissionCard";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import Padding from "../UIComponents/Padding";
import { startChallenge, getChallengeIndex, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";
import GreenButton from "../UIComponents/GreenButton";
import GreenText from "../UIComponents/GreenText";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modal";
import setChallengeDetailsButtonText from "../../utility/textHelpers";
import { getRoute } from "../../utility/helpers";

type Props = {
  +navigation: any
}

type State = {
  challenge: Object,
  missions: Object,
  challengeStarted: boolean,
  showModal: boolean,
  index: ?string,
  route: ?string
}

class ChallengeDetailsScreen extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      challenge: {},
      missions: {},
      challengeStarted: false,
      showModal: false,
      index: null,
      route: null
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  async setupScreen() {
    const index = await getChallengeIndex();
    const route = await getRoute();
    this.setState( { index, route }, () => {
      this.fetchChallengeDetails();
    } );
  }

  resetState() {
    this.setState( {
      challenge: {},
      missions: {},
      challengeStarted: false,
      showModal: false,
      index: null,
      route: null
    } );
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  fetchChallengeDetails() {
    const { index } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        const challenge = challenges[0];
        const missionList = Object.keys( challenge.missions ).map(
          mission => challenge.missions[mission]
        );
        const observationsList = Object.keys( challenge.numbersObserved ).map(
          number => challenge.numbersObserved[number]
        );

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
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  showMission() {
    const { index } = this.state;

    startChallenge( index );
    this.fetchChallengeDetails();
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  render() {
    const {
      challengeStarted,
      showModal,
      challenge,
      missions,
      route
    } = this.state;
    const { navigation } = this.props;

    const buttonText = setChallengeDetailsButtonText( challenge, challengeStarted );

    const button = (
      <GreenButton
        color={colors.seekGreen}
        handlePress={() => {
          if ( !challengeStarted ) {
            this.showMission();
          } else if ( challengeStarted && challenge.percentComplete < 100 ) {
            navigation.navigate( "Camera" );
          } else if ( challengeStarted && challenge.percentComplete === 100 ) {
            this.openModal();
          }
        }}
        text={buttonText}
      />
    );

    return (
      <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
        <SafeAreaView style={styles.safeView}>
          <StatusBar barStyle="light-content" />
          <NavigationEvents
            onWillBlur={() => this.resetState()}
            onWillFocus={() => {
              this.scrollToTop();
              recalculateChallenges();
              this.setupScreen();
            }}
          />
          <Modal
            showModal={showModal}
            closeModal={this.closeModal}
            modal={(
              <ChallengeEarnedModal
                challenge={challenge}
                closeModal={this.closeModal}
              />
            )}
          />
          {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
          <ImageBackground
            source={backgrounds[challenge.backgroundName]}
            style={styles.challengeBackground}
          >
            <CustomBackArrow route={route} />
            <View style={styles.margin} />
            <View style={styles.logoContainer}>
              <Image source={logos.op} style={styles.logo} />
            </View>
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
            <View style={styles.marginHorizontal}>
              {button}
            </View>
          </ImageBackground>
          <View style={styles.whiteContainer}>
            {challengeStarted ? (
              <ChallengeMissionCard
                challenge={challenge}
                missions={missions}
              />
            ) : null}
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{challenge.description}</Text>
            </View>
            <View style={styles.secondHeader}>
              <GreenText text="challenges.get_involved" />
            </View>
            <View style={styles.marginTop} />
            <Text style={styles.descriptionText}>
              {i18n.t( challenge.action )}
            </Text>
            <View style={styles.descriptionContainer}>
              <Image source={logos.wwfop} style={styles.row} />
              <Text style={styles.photographerText}>{i18n.t( challenge.photographer )}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate( "Challenges" )}
                style={styles.padding}
              >
                <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
              </TouchableOpacity>
            </View>
            <Padding />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ChallengeDetailsScreen;
