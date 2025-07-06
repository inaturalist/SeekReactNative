import { useState, useEffect } from "react";
import Realm from "realm";

import realmConfig from "../../../../models";

interface ChallengeRealm {
  percentComplete: number;
  availableDate: Date;
}

const useLatestChallenge = ( ) => {
  const [challenge, setChallenge] = useState<ChallengeRealm | null>( null );

  useEffect( ( ) => {
    const fetchLatestChallenge = ( ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" )
          .filtered( "percentComplete != 100" )
          .sorted( "availableDate", true );

        if ( incompleteChallenges.length === 0 ) { return; }
        setChallenge( incompleteChallenges[0] );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
    };

    fetchLatestChallenge( );
  }, [] );

  return challenge;
};

export default useLatestChallenge;
