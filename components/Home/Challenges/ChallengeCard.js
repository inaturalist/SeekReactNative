import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

import styles from "../../../styles/home/challenges";
import realmConfig from "../../../models";
import Challenges from "./Challenges";
import GreenText from "../../UIComponents/GreenText";
import NoChallenges from "./NoChallenges";

const ChallengeCard = () => {
  const { navigate } = useNavigation();
  const [challenge, setChallenge] = useState( null );

  const fetchLatestChallenge = useCallback( ( ) => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const incompleteChallenges = realm.objects( "ChallengeRealm" )
        .filtered( "percentComplete != 100" )
        .sorted( "availableDate", true );

      if ( incompleteChallenges.length === 0 ) { return; }
      setChallenge( incompleteChallenges[0] );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to open realm, error: ", err );
    } );
  }, [] );

  useEffect( () => fetchLatestChallenge( ), [fetchLatestChallenge] );

  const navToChallenges = ( ) => navigate( "Challenges" );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navToChallenges} style={styles.header}>
        <GreenText text="challenges_card.header" />
      </TouchableOpacity>
      {challenge ? <Challenges challenge={challenge} /> : <NoChallenges />}
    </View>
  );
};

export default ChallengeCard;
