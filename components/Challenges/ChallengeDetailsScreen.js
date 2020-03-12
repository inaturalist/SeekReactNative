// @flow

import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import ChallengeDetailsHeader from "./ChallengeDetailsHeader";
import { startChallenge, getChallengeIndex, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";
import { getRoute } from "../../utility/helpers";
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";

type Props = {
  +navigation: any
}

type State = {
  challenge: Object,
  missions: Object,
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
      index: null,
      route: null
    };

    ( this:any ).showMission = this.showMission.bind( this );
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
      missions: [],
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

  fetchMissions( challenge: Object ) {
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

    this.setState( { missions } );
  }

  fetchChallengeDetails() {
    const { index } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        this.fetchMissions( challenges[0] );

        this.setState( { challenge: challenges[0] } );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  showMission() {
    const { index } = this.state;

    startChallenge( index );
    this.fetchChallengeDetails();
  }

  render() {
    const {
      challenge,
      missions,
      route
    } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.background}
        ref={( ref ) => { this.scrollView = ref; }}
      >
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
          {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
          <ChallengeDetailsHeader
            challenge={challenge}
            navigation={navigation}
            route={route}
            showMission={this.showMission}
          />
          <ChallengeDetailsContainer
            challenge={challenge}
            navigation={navigation}
            missions={missions}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ChallengeDetailsScreen;
