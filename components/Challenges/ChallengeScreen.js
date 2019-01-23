// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView
} from "react-native";
import Realm from "realm";

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Footer from "./ChallengeFooter";

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

    this.fetchChallenges = this.fetchChallenges.bind( this );
  }

  componentDidMount() {
    this.fetchChallenges();
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
            percentComplete: 0,
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
            percentComplete: 100,
            index: challenge.index
          } );
        } );

        this.setState( {
          challengesNotStarted,
          challengesStarted,
          challengesCompleted
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { challengesNotStarted, challengesStarted, challengesCompleted } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.column}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.in_progress" ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.challengesContainer}>
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
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.not_started" ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.challengesContainer}>
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
          </View>
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
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default ChallengeScreen;
