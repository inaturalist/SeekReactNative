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
import badges from "../../assets/badges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Padding from "../UIComponents/Padding";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenText from "../UIComponents/GreenText";
import SafeAreaView from "../UIComponents/SafeAreaView";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/NoChallenges";

type Props = {
  +navigation: any
}

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
        const challengesNotStarted = [];
        const challengesStarted = [];
        const challengesCompleted = [];
        const notStarted = realm.objects( "ChallengeRealm" ).filtered( "started == false" );
        const started = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete != 100" );
        const completed = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete == 100" );

        notStarted.forEach( ( challenge ) => {
          challengesNotStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: badges.badge_empty,
            started: challenge.started,
            index: challenge.index
          } );
        } );

        started.forEach( ( challenge ) => {
          challengesStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: badges.badge_empty,
            started: challenge.started,
            totalSpecies: challenge.totalSpecies,
            percentComplete: challenge.percentComplete,
            index: challenge.index
          } );
        } );

        completed.forEach( ( challenge ) => {
          challengesCompleted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: badges[challenge.earnedIconName],
            started: challenge.started,
            totalSpecies: challenge.totalSpecies,
            percentComplete: challenge.percentComplete,
            index: challenge.index
          } );
        } );

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
    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <GreenText
            text="challenges.in_progress"
            center={null}
            smaller={null}
            color={null}
          />
        </View>
        {challengesStarted.length > 0 ? (
          <View>
            {challengesStarted.map( ( item ) => (
              <ChallengeProgressCard
                key={`${item.name}`}
                item={item}
                navigation={navigation}
                fetchChallenges={null}
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
    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <GreenText
            text="challenges.not_started"
            center={null}
            smaller={null}
            color={null}
          />
        </View>
        {challengesNotStarted.length > 0 ? (
          <View>
            {challengesNotStarted.map( ( item ) => (
              <ChallengeProgressCard
                key={`${item.name}`}
                fetchChallenges={this.fetchChallenges}
                item={item}
                navigation={navigation}
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
    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <GreenText
            text="challenges.completed"
            center={null}
            smaller={null}
            color={null}
          />
        </View>
        {challengesCompleted.length > 0 ? (
          challengesCompleted.map( ( item ) => (
            <ChallengeProgressCard
              key={`${item.name}`}
              item={item}
              navigation={navigation}
              fetchChallenges={null}
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
    const { navigation } = this.props;

    const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader
          header={i18n.t( "challenges.header" )}
          navigation={navigation}
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
