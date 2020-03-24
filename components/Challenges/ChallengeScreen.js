// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Padding from "../UIComponents/Padding";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenText from "../UIComponents/GreenText";
import SafeAreaView from "../UIComponents/SafeAreaView";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/Challenges/NoChallenges";

type Props = {}

type State = {
  challengesNotStarted: Array<Object>,
  challengesStarted: Array<Object>,
  challengesCompleted: Array<Object>
}

class ChallengeScreen extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      challengesNotStarted: [],
      challengesStarted: [],
      challengesCompleted: []
    };
  }

  fetchChallenges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        this.setState( {
          challengesNotStarted,
          challengesStarted,
          challengesCompleted
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  renderChallengesStarted() {
    const { challengesStarted } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <GreenText text="challenges.in_progress" />
        </View>
        {challengesStarted.length > 0 ? (
          <View>
            {challengesStarted.map( ( challenge ) => (
              <ChallengeProgressCard
                key={`${challenge.name}`}
                challenge={challenge}
              />
            ) )}
            <View style={styles.margin} />
          </View>
        ) : (
          <View style={styles.noChallengeContainer}>
            <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_challenges_in_progress" )}</Text>
          </View>
        )}
      </View>
    );
  }

  renderChallengesNotStarted() {
    const { challengesNotStarted } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <GreenText text="challenges.not_started" />
        </View>
        {challengesNotStarted.length > 0 ? (
          <View>
            {challengesNotStarted.map( ( challenge ) => (
              <ChallengeProgressCard
                key={`${challenge.name}`}
                fetchChallenges={this.fetchChallenges}
                challenge={challenge}
              />
            ) )}
            <View style={styles.margin} />
          </View>
        ) : (
          <View style={styles.noChallengeContainer}>
            <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_new_challenges_header" )}</Text>
            <Text style={styles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
          </View>
        )}
      </View>
    );
  }

  renderChallengesCompleted() {
    const { challengesCompleted } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <GreenText text="challenges.completed" />
        </View>
        {challengesCompleted.length > 0 ? (
          challengesCompleted.map( ( challenge ) => (
            <ChallengeProgressCard
              key={`${challenge.name}`}
              challenge={challenge}
            />
          ) )
        ) : (
          <View style={styles.noChallengeContainer}>
            <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_completed_challenges" )}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { challengesNotStarted, challengesStarted } = this.state;

    const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader
          header="challenges.header"
          route="Main"
        />
        <ScrollView>
          <NavigationEvents
            onWillFocus={() => {
              recalculateChallenges();
              this.fetchChallenges();
            }}
          />
          {noChallenges ? (
            <View style={styles.margins}>
              <NoChallenges />
            </View>
          ) : null}
          {noChallenges ? null : this.renderChallengesStarted()}
          {noChallenges ? null : this.renderChallengesNotStarted()}
          {this.renderChallengesCompleted()}
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default ChallengeScreen;
