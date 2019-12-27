// @flow

import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Realm from "realm";

import styles from "../../styles/home/challenges";
import realmConfig from "../../models/index";
import Challenges from "./Challenges";
import GreenText from "../UIComponents/GreenText";
import NoChallenges from "./NoChallenges";

type Props = {
  +navigation: any
};

const ChallengeCard = ( { navigation }: Props ) => {
  const [challenge, setChallenge] = useState( null );

  const fetchLatestChallenge = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100" );
        if ( incompleteChallenges.length > 0 ) {
          const latestChallenge = incompleteChallenges.sorted( "availableDate", true );
          setChallenge( latestChallenge[0] );
        } else {
          setChallenge( null );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => {
    fetchLatestChallenge();
  }, [] );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Challenges" )}
        style={styles.header}
      >
        <GreenText text="challenges_card.header" />
      </TouchableOpacity>
      {challenge
        ? <Challenges challenge={challenge} navigation={navigation} />
        : <NoChallenges />}
    </View>
  );
};

export default ChallengeCard;
