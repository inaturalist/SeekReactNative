// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import badges from "../../assets/badges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Footer from "./ChallengeFooter";
import Padding from "../Padding";
import GreenHeader from "../GreenHeader";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import { createFakeObservations } from "../../utility/test";

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
    // createFakeObservations();
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
          <Text style={styles.headerText}>
            {i18n.t( "challenges.in_progress" ).toLocaleUpperCase()}
          </Text>
        </View>
        {challengesStarted.length > 0 ? (
          <View>
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
            <View style={{ marginTop: 23 }} />
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
          <Text style={styles.headerText}>
            {i18n.t( "challenges.not_started" ).toLocaleUpperCase()}
          </Text>
        </View>
        {challengesNotStarted.length > 0 ? (
          <View>
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
            <View style={{ marginTop: 23 }} />
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
          <Text style={styles.headerText}>
            {i18n.t( "challenges.completed" ).toLocaleUpperCase()}
          </Text>
        </View>
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
    );
  }

  render() {
    const { challengesNotStarted, challengesStarted } = this.state;
    const { navigation } = this.props;

    const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader navigation={navigation} header={i18n.t( "challenges.header" )} />
          <ScrollView contentContainerStyle={styles.column}>
            <NavigationEvents
              onWillFocus={ () => {
                recalculateChallenges();
                this.fetchChallenges();
              }}
            />
            {noChallenges ? (
              <View style={[styles.noChallengeContainer, { height: 170 }]}>
                {/* <View style={{ marginTop: 39 }} /> */}
                <View style={styles.noChallengeRow}>
                  <Image source={icons.completed} />
                  <View style={styles.noChallengeTextContainer}>
                    <Text style={[styles.noChallengeText, { textAlign: "left" }]}>{i18n.t( "challenges.completed_all" )}</Text>
                    <Text style={[styles.lightText, { textAlign: "left", marginLeft: 0 }]}>{i18n.t( "challenges.no_new_challenges" )}</Text>
                  </View>
                </View>
              </View>
            ) : null}
            {noChallenges ? null : this.renderChallengesStarted()}
            {/* {noChallenges ? null : <View style={{ marginTop: 49 }} />} */}
            {noChallenges ? null : this.renderChallengesNotStarted()}
            {/* {noChallenges ? null : <View style={{ marginTop: 49 }} />} */}
            {this.renderChallengesCompleted()}
            <Padding />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default ChallengeScreen;
