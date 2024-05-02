import { useEffect, useState } from "react";

import realmConfig from "../../models";

type Observation = {
  uuidString?: string;
  date?: Date,
  taxon: {
    defaultPhoto?: {
      backupUri?: string;
      mediumUrl?: string;
    }};
  latitude?: number;
  longitude?: number;
}
const useSeenTaxa = ( id: number ): Object | null => {
  const [seenTaxa, setSeenTaxa] = useState<Observation | null>( null );

  useEffect( () => {
    setSeenTaxa( null );
    let isCurrent = true;

    Realm.open( realmConfig ).then( ( realm ) => {
      const observations = realm.objects( "ObservationRealm" );
      const seen = observations.filtered( `taxon.id == ${id}` )[0];

      // seen is undefined when filtered realm is empty
      if ( isCurrent && seen !== undefined ) {
        // TODO: make our Realm setup work with TS
        setSeenTaxa( seen );
      }
    } ).catch( ( e ) => console.log( "[DEBUG] Failed to open realm, error: ", e ) );

    return () => {
      isCurrent = false;
    };
  }, [id] );

  return seenTaxa;
};

export { useSeenTaxa };
