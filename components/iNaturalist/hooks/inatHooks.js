// @flow

import { useState, useEffect } from "react";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import { capitalizeNames, shuffleList } from "../../../utility/helpers";
import { localizeAttributions } from "../../../utility/photoHelpers";
import createUserAgent from "../../../utility/userAgent";

const useFetchPhotos = ( ): any => {
  const [photos, setPhotos] = useState( [] );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchProjectPhotos = ( ) => {
      const params = {
        project_id: 29905,
        photos: true,
        quality_grade: "research",
        lrank: "species",
        hrank: "species",
        locale: i18n.locale
      };

      const options = { user_agent: createUserAgent( ) };

      inatjs.observations.search( params, options ).then( ( { results } ) => {
        const taxa = results.map( ( r ) => r.taxon );

        const projectPhotos = [];

        taxa.forEach( photo => {
          const { defaultPhoto } = photo;

          if ( !defaultPhoto ) {
            return;
          }

          if ( defaultPhoto.license_code && defaultPhoto.original_dimensions ) {
            // some original dimensions can be null
            if ( defaultPhoto.original_dimensions.width > defaultPhoto.original_dimensions.height ) {
              projectPhotos.push( {
                photoUrl: defaultPhoto.medium_url,
                commonName: photo.preferred_common_name
                  ? capitalizeNames( photo.preferred_common_name )
                  : capitalizeNames( photo.iconic_taxon_name ),
                attribution: localizeAttributions(
                  defaultPhoto.attribution,
                  defaultPhoto.license_code,
                  "iNatStats"
                )
              } );
            }
          }
        } );

        const randomEightPhotos = shuffleList( projectPhotos ).splice( 0, 8 );
        if ( isCurrent ) {
          setPhotos( randomEightPhotos );
        }
      } ).catch( ( e ) => console.log( e, "couldn't fetch project photos" ) );
    };

    fetchProjectPhotos( );

    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return photos;
};

const useFetchObservationCount = ( login: ?string, name: string, username: string ): any => {
  const [observationCount, setObservationCount] = useState( null );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchObservationsMadeViaSeek = async ( ) => {
      const params = {
        oauth_application_id: 333,
        user_id: username
      };

      const options = { user_agent: createUserAgent( ) };

      const response = await inatjs.observations.search( params, options );
      const results = response.total_results;

      if ( isCurrent ) {
        setObservationCount( results );
      }
    };

    if ( login && name === "iNatStats" ) {
      fetchObservationsMadeViaSeek( );
    }

    return ( ) => {
      isCurrent = false;
    };
  }, [login, name, username] );

  return observationCount;
};

export {
  useFetchPhotos,
  useFetchObservationCount
};
