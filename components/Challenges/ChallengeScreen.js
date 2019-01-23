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
      challenges: [
        {
          name: i18n.t( "challenges.connectivity" ),
          description: i18n.t( "challenges.op_april" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          started: true,
          percentComplete: 62
        },
        {
          name: i18n.t( "challenges.biodiversity" ),
          description: i18n.t( "challenges.op_may" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          started: true,
          percentComplete: 0
        },
        {
          name: i18n.t( "challenges.productivity" ),
          description: i18n.t( "challenges.op_june" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          started: true,
          percentComplete: 25
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchChallenges();
  }

  fetchChallenges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challengesNotStarted = [];
        const notStarted = realm.objects( "ChallengeRealm" ).filtered( "started == false" );
        // filter challenges where started === true && completed === false
        // filter challenges where started === true && completed === true

        notStarted.forEach( ( challenge ) => {
          challengesNotStarted.push( {
            name: i18n.t( challenge.name ),
            month: i18n.t( challenge.month ),
            iconName: icons.badgePlaceholder,
            started: false
          } );
        } );

        this.setState( {
          challengesNotStarted
        }, () => console.log( this.state.challengesNotStarted, "state" ) );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { challenges, challengesNotStarted } = this.state;
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
              data={challenges}
              keyExtractor={( item, i ) => `${item}${i}`}
              renderItem={( { item } ) => (
                <ChallengeProgressCard item={item} navigation={navigation} />
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
                <ChallengeProgressCard item={item} navigation={navigation} />
              )}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.completed" ).toLocaleUpperCase()}
            </Text>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default ChallengeScreen;
