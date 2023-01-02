// @flow

import { useState, useEffect } from "react";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import { capitalizeNames } from "../../../utility/helpers";
import createUserAgent from "../../../utility/userAgent";
import { fetchUserLocation } from "../../../utility/locationHelpers";

const useSearchSpecies = ( speciesName: ?string ): any => {
  const [suggestions, setSuggestions] = useState( [] );

  useEffect( ( ) => {
    const searchForSpecies = ( ) => {
      const params = {
        q: speciesName,
        per_page: 5,
        is_active: true,
        locale: i18n.currentLocale( )
      };

      const options = { user_agent: createUserAgent( ) };

      inatjs.taxa.autocomplete( params, options ).then( ( { results } ) => {
        if ( results.length === 0 ) { return; }

        const newSuggestions = results.map( ( s ) => {
          return {
            image:
              s.defaultPhoto && s.defaultPhoto.medium_url
                ? s.defaultPhoto.medium_url
                : null,
            commonName: s.preferred_common_name
              && capitalizeNames( s.preferred_common_name ),
            scientificName: s.name,
            id: s.id,
            iconicTaxonId: s.iconic_taxon_id
          };
        } );

        setSuggestions( newSuggestions );
      } ).catch( ( err ) => console.log( err, "couldn't find species" ) );
    };

    searchForSpecies( );
  }, [speciesName] );

  return suggestions;
};

const useFetchUserLocation = ( ): Object => {
  const [userCoords, setUserCoords] = useState( null );
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
  useFetchUserLocation
};
