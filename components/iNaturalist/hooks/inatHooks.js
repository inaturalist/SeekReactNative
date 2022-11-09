// @flow

import { useState, useEffect } from "react";
import inatjs from "inaturalistjs";
import Realm from "realm";
import { useNetInfo } from "@react-native-community/netinfo";

import i18n from "../../../i18n";
import { capitalizeNames, shuffleList } from "../../../utility/helpers";
import { localizeAttributions } from "../../../utility/photoHelpers";
import createUserAgent from "../../../utility/userAgent";
import realmConfig from "../../../models";

const useFetchPhotos = ( ): any => {
  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

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
  }, [isConnected] );

  return photos;
};

const useFetchObservationCount = ( login: ?string, username: string, triggerReload: Boolean ): any => {
  const [observationCount, setObservationCount] = useState( null );

  const updateSavedLogin = async ( newCount ) => {
    try {
      const realm = await Realm.open( realmConfig );
      const savedLogin = realm.objects( "LoginRealm" );

      if ( savedLogin[0].observationCount !== newCount ) {
        realm.write( ( ) => {
          savedLogin[0].observationCount = newCount;
        } );
      }
      return savedLogin[0].observationCount;
    } catch ( e ) {
      console.log( "couldn't update saved login" );
    }
  };

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

      const savedCount = await updateSavedLogin( results );

      if ( isCurrent ) {
        setObservationCount( savedCount );
      }
    };

    if ( login ) {
      fetchObservationsMadeViaSeek( );
    }

    return ( ) => {
      isCurrent = false;
    };
  }, [login, username, triggerReload] );

  return observationCount;
};

export {
  useFetchPhotos,
  useFetchObservationCount
};
