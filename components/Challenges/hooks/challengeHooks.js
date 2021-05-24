// @flow

import { useState, useEffect } from "react";
import Realm from "realm";

import realmConfig from "../../../models";
import { recalculateChallenges } from "../../../utility/challengeHelpers";

const useFetchChallenges = ( ): any => {
  const [list, setList] = useState( [] );

  useEffect( ( ) => {
    const fetchChallenges = ( ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

        if ( noChallenges ) {
          setList( [{
            id: 0,
            data: [],
            header: "",
            empty: ""
          }, {
            id: 1,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        } else {
          setList( [{
            id: 0,
            data: challengesStarted,
            header: "challenges.in_progress",
            empty: "no_challenges_in_progress"
          }, {
            id: 1,
            data: challengesNotStarted,
            header: "challenges.not_started",
            empty: "no_new_challenges_header"
          }, {
            id: 2,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
    };
    recalculateChallenges( );
    fetchChallenges( );
  }, [] );

  return list;
};

const useFetchMissions = ( challenge: Object ): any => {
  const [missions, setMissions] = useState( [] );

  useEffect( ( ) => {
    const { numbersObserved } = challenge;
    const missionList = Object.keys( challenge.missions ).map( mission => challenge.missions[mission] );
    const observationsList = Object.keys( numbersObserved ).map( number => numbersObserved[number] );

    const newMissions = missionList.map( ( mission, i ) => ( {
      mission,
      observations: observationsList[i]
    } ) );

    setMissions( newMissions );
  }, [challenge] );

  return missions;
};

export {
  useFetchChallenges,
  useFetchMissions
};
