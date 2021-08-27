// @flow

import React, { useState, useEffect, useCallback, useContext } from "react";
import Realm from "realm";
import { useIsFocused } from "@react-navigation/native";
import type { Node } from "react";

import realmConfig from "../../../models";
import ChallengeDetailsHeader from "./ChallengeDetailsHeader";
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";
import ScrollNoHeader from "../../UIComponents/Screens/ScrollNoHeader";
import { ChallengeContext } from "../../UserContext";

const ChallengeDetailsScreen = ( ): Node => {
  const { challengeIndex } = useContext( ChallengeContext );
  const isFocused = useIsFocused( );
  const [challenge, setChallenge] = useState( null );

  const fetchChallenge = ( index ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        setChallenge( challenges[0] );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const setupScreen = useCallback( ( ) => fetchChallenge( challengeIndex ), [challengeIndex] );

  useEffect( ( ) => {
    if ( isFocused ) { // need this for screens where challenge index must change
      setupScreen( );
    } else {
      setChallenge( null ); // reset necessary for race condition on iOS
    }
  }, [setupScreen, isFocused] );

  if ( !challenge ) {
    return null;
  }

  return (
    <ScrollNoHeader>
      <ChallengeDetailsHeader challenge={challenge} showMission={fetchChallenge} />
      <ChallengeDetailsContainer challenge={challenge} />
    </ScrollNoHeader>
  );
};

export default ChallengeDetailsScreen;
