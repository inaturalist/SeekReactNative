import { useState, useEffect } from "react";

import { getTaxonCommonName } from "../commonNamesHelpers";

const useCommonName = ( id?: number ): string | undefined => {
  const [commonName, setCommonName] = useState<string>( );

  useEffect( () => {
    let isCurrent = true;

    if ( !id ) { return; }

    getTaxonCommonName( id ).then( ( name ) => {
      if ( isCurrent ) {
        setCommonName( name );
      }
    } );

    return () => {
      isCurrent = false;
    };
  }, [id] );

  return commonName;
};

export { useCommonName };
