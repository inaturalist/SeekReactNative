import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

import styles from "../../../styles/home/challenges";
import realmConfig from "../../../models";
import Challenges from "./Challenges";
import GreenText from "../../UIComponents/GreenText";
import NoChallenges from "./NoChallenges";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";

const ChallengeCard = () => {
  const navigation = useNavigation();
  const [challenge, setChallenge] = useState( null );

  const fetchLatestChallenge = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100" );
        if ( incompleteChallenges.length > 0 ) {
          const latest = incompleteChallenges.sorted( "availableDate", true );
          setChallenge( latest[0] );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => {
    const unsub = navigation.addListener( "focus", () => fetchLatestChallenge() );

    return unsub;
  }, [navigation] );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Challenges" )}
        style={styles.header}
      >
        <GreenText text="challenges_card.header" />
      </TouchableOpacity>
      {challenge ? <Challenges challenge={challenge} /> : <NoChallenges />}
    </View>
  );
};

export default ChallengeCard;
