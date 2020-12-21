import React, { useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import styles from "../../../styles/species/similarSpecies";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import GreenText from "../../UIComponents/GreenText";
import createUserAgent from "../../../utility/userAgent";

type Props = {
  +id: ?Number
}

const SimilarSpecies = ( { id }: Props ) => {
  const [similarSpecies, setSimilarSpecies] = useState( [] );
  const { length } = similarSpecies;

  useEffect( ( ) => {
    let isActive = true;
    if ( id !== null ) {
      const resetState = ( ) => setSimilarSpecies( [] );

      const fetchSimilarSpecies = ( ) => {
        const params = {
          per_page: 20,
          taxon_id: id,
          without_taxon_id: 43584,
          locale: i18n.currentLocale()
        };

        const options = { user_agent: createUserAgent( ) };

        inatjs.identifications.similar_species( params, options ).then( ( { results } ) => {
          const species = results.map( r => r.taxon );

          if ( isActive ) {
            setSimilarSpecies( species );
          }
        } ).catch( ( error ) => console.log( error, "error fetching similar species" ) );
      };
      resetState( );
      fetchSimilarSpecies( );
    }
    return ( ) => {
      isActive = false;
    };
  }, [id] );

  return useMemo( ( ) => (
    <>
      {length > 0 && (
        <View>
          <View style={styles.similarSpeciesMargins}>
            <GreenText text="species_detail.similar" />
          </View>
          <View style={styles.similarSpeciesContainer}>
            <SpeciesNearbyList taxa={similarSpecies} />
          </View>
        </View>
      )}
      <View style={[styles.bottomPadding, length === 0 && styles.empty]} />
    </>
  ), [length, similarSpecies] );
};

export default SimilarSpecies;
