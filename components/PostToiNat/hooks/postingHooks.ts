import { useState, useEffect } from "react";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import { capitalizeNames } from "../../../utility/helpers";
import { Coords, fetchUserLocation } from "../../../utility/locationHelpers";

export type Suggestion = {
  defaultPhoto: {
    medium_url: string;
  };
  preferred_common_name: string;
  name: string;
  id: number;
  iconic_taxon_id: number;
}
const useSearchSpecies = ( speciesName: string | null ) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>( [] );

  useEffect( ( ) => {
    const searchForSpecies = ( ) => {
      const params = {
        q: speciesName,
        per_page: 5,
        is_active: true,
        locale: i18n.locale,
      };

      inatjs.taxa.autocomplete( params ).then( ( { results } ) => {
        if ( results.length === 0 ) { return; }

        const newSuggestions = results.map( ( s: Suggestion ) => {
          return {
            image:
              s.defaultPhoto && s.defaultPhoto.medium_url
                ? s.defaultPhoto.medium_url
                : null,
            commonName: s.preferred_common_name
              && capitalizeNames( s.preferred_common_name ),
            scientificName: s.name,
            id: s.id,
            iconicTaxonId: s.iconic_taxon_id,
          };
        } );

        setSuggestions( newSuggestions );
      } ).catch( ( err: Error ) => console.log( err, "couldn't find species" ) );
    };

    searchForSpecies( );
  }, [speciesName] );

  return suggestions;
};

const useFetchUserLocation = ( ) => {
  const [userCoords, setUserCoords] = useState<Coords | null>( null );
  const [fetching, setFetching] = useState( false );

  useEffect( ( ) => {
    if ( !userCoords && !fetching ) {
      setFetching( true );
      fetchUserLocation( true ).then( ( coords ) => {
        setUserCoords( coords );
      } ).catch( ( err ) => {
        if ( err ) {
          fetchUserLocation( false ).then( ( coords ) => {
            setUserCoords( coords );
          } ).catch( ( ) => console.log( "couldn't fetch user coords" ) );
        }
      } );
    }
  }, [userCoords, fetching] );

  return userCoords;
};

export {
  useSearchSpecies,
  useFetchUserLocation,
};
