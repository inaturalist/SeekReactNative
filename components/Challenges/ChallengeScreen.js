// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Footer from "./ChallengeFooter";
import { recalculateChallenges } from "../../utility/challengeHelpers";

type Props = {
  navigation: any
}

class ChallengeScreen extends Component<Props> {
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
        const started = realm.objects( "ChallengeRealm" ).filtered( "started == true AND completed == false" );
        const completed = realm.objects( "ChallengeRealm" ).filtered( "started == true AND completed == true" );

        notStarted.forEach( ( challenge ) => {
          challengesNotStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: icons.badgePlaceholder,
            started: false,
            index: challenge.index
          } );
        } );

        started.forEach( ( challenge ) => {
          challengesStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: icons.badgePlaceholder,
            started: true,
            totalSpecies: challenge.totalSpecies,
            percentComplete: challenge.percentComplete,
            index: challenge.index
          } );
        } );

        completed.forEach( ( challenge ) => {
          challengesStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: icons.badgePlaceholder,
            started: true,
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
          <Text style={styles.headerText}>
            {i18n.t( "challenges.in_progress" ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.challengesContainer}>
          {challengesStarted.length > 0 ? (
            <FlatList
              data={challengesStarted}
              keyExtractor={( item, i ) => `${item}${i}`}
              renderItem={( { item } ) => (
                <ChallengeProgressCard
                  item={item}
                  navigation={navigation}
                />
              )}
            />
          ) : (
            <View style={styles.noChallengeContainer}>
              <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_challenges_in_progress" )}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  renderChallengesNotStarted() {
    const { challengesNotStarted } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t( "challenges.not_started" ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.challengesContainer}>
          {challengesNotStarted.length > 0 ? (
            <FlatList
              data={challengesNotStarted}
              keyExtractor={( item, i ) => `${item}${i}`}
              renderItem={( { item } ) => (
                <ChallengeProgressCard
                  item={item}
                  navigation={navigation}
                  fetchChallenges={this.fetchChallenges}
                />
              )}
            />
          ) : (
            <View style={styles.noChallengeContainer}>
              <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_new_challenges_header" )}</Text>
              <Text style={styles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  renderChallengesCompleted() {
    const { challengesCompleted } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t( "challenges.completed" ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.challengesContainer}>
          {challengesCompleted.length > 0 ? (
            <FlatList
              data={challengesCompleted}
              keyExtractor={( item, i ) => `${item}${i}`}
              renderItem={( { item } ) => (
                <ChallengeProgressCard
                  item={item}
                  navigation={navigation}
                />
              )}
            />
          ) : (
            <View style={styles.noChallengeContainer}>
              <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_completed_challenges" )}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    const { challengesNotStarted, challengesStarted } = this.state;
    const { navigation } = this.props;

    const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.column}>
          <NavigationEvents
            onWillFocus={ () => {
              recalculateChallenges();
              this.fetchChallenges();
            }}
          />
          {noChallenges ? (
            <View style={styles.noChallengeContainer}>
              <Text style={styles.noChallengeText}>{i18n.t( "challenges.completed_all" )}</Text>
              <Text style={styles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
            </View>
          ) : null}
          {noChallenges ? null : this.renderChallengesStarted()}
          {noChallenges ? null : this.renderChallengesNotStarted()}
          {this.renderChallengesCompleted()}
          <View style={styles.extraPadding} />
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default ChallengeScreen;
