// @flow

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import inatjs from "inaturalistjs";
import type { Node } from "react";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import { capitalizeNames, shuffleList } from "../utility/helpers";
import { localizeAttributions } from "../utility/photoHelpers";
import createUserAgent from "../utility/userAgent";
import HorizontalScroll from "./UIComponents/HorizontalScroll";

const INatStatsPhotos = ( ): Node => {
  const [photos, setPhotos] = useState( [] );

  const renderPhotos = ( ) => photos.map( ( photo ) => (
    <View key={`image${photo.photoUrl}`} style={styles.center}>
      <Image
        source={{ uri: photo.photoUrl }}
        style={styles.image}
      />
      <Text style={[styles.missionText, styles.caption]}>
        {`${photo.commonName} ${i18n.t( "inat_stats.by" )} ${photo.attribution}`}
      </Text>
    </View>
  ) );

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

        taxa.forEach( ( photo ) => {
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

  const photoList = renderPhotos( );

  return (
    <HorizontalScroll photoList={photoList} />
  );
};

export default INatStatsPhotos;
