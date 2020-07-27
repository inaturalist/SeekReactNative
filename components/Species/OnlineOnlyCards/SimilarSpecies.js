import React, { useState, useEffect } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import styles from "../../../styles/species/similarSpecies";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import GreenText from "../../UIComponents/GreenText";
import createUserAgent from "../../../utility/userAgent";

type Props = {
  +id: ?Number,
  +fetchiNatData: Function
}

const SimilarSpecies = ( { id, fetchiNatData }: Props ) => {
  const [similarSpecies, setSimilarSpecies] = useState( [] );
  const [loading, setLoading] = useState( true );

  const { length } = similarSpecies;

  useEffect( () => {
    if ( id !== null ) {
      const resetState = () => {
        setSimilarSpecies( [] );
        setLoading( true );
      };

      const fetchSimilarSpecies = () => {
        const params = {
          per_page: 20,
          taxon_id: id,
          without_taxon_id: 43584,
          locale: i18n.currentLocale()
        };

        const options = { user_agent: createUserAgent() };

        inatjs.identifications.similar_species( params, options ).then( ( { results } ) => {
          const species = results.map( r => r.taxon );

          setSimilarSpecies( species );
          setLoading( false );
        } ).catch( ( error ) => console.log( error, "error fetching similar species" ) );
      };
      resetState();
      fetchSimilarSpecies();
    }
  }, [id] );

  return (
    <>
      {length > 0 && (
        <View>
          <View style={styles.similarSpeciesMargins}>
            <GreenText text="species_detail.similar" />
          </View>
          <View style={[
            styles.similarSpeciesContainer,
            loading && styles.loading
          ]}
          >
            <SpeciesNearbyList
              fetchiNatData={() => fetchiNatData( "similarSpecies" )}
              taxa={similarSpecies}
            />
          </View>
        </View>
      )}
      <View style={[styles.bottomPadding, length === 0 && styles.empty]} />
    </>
  );
};

export default SimilarSpecies;
