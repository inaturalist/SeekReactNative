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
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";

type State = {
  challenge: Object,
  index: ?string
}

class ChallengeDetailsScreen extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      challenge: null,
      index: null
    };

    ( this:any ).showMission = this.showMission.bind( this );
  }

  async setupScreen() {
    const index = await getChallengeIndex();
    this.setState( { index }, () => {
      this.fetchChallengeDetails();
    } );
  }

  resetState() {
    this.setState( {
      challenge: null,
      index: null
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
    const { challenge } = this.state;

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
            showMission={this.showMission}
          />
          <ChallengeDetailsContainer
            challenge={challenge}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ChallengeDetailsScreen;
