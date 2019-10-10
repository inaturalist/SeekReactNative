// @flow

import React, { Component } from "react";
import {
  View
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/home/challenges";
import realmConfig from "../../models/index";
import Challenges from "./Challenges";
import NoChallenges from "./NoChallenges";

type Props = {
  +navigation: any
}

class ChallengeCard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      challenge: null
    };
  }

  setChallenge( challenge ) {
    this.setState( { challenge } );
  }

  fetchLatestChallenge() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100" );
        if ( incompleteChallenges.length > 0 ) {
          const latestChallenge = incompleteChallenges.sorted( "availableDate", true );
          this.setChallenge( latestChallenge[0] );
        } else {
          this.setChallenge( null );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { navigation } = this.props;
    const { challenge } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.fetchLatestChallenge()}
        />
        {challenge
          ? <Challenges challenge={challenge} navigation={navigation} />
          : <NoChallenges navigation={navigation} />}
      </View>
    );
  }
}

export default ChallengeCard;
