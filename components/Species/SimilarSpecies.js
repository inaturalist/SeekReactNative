import React, { useState, useEffect } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import styles from "../../styles/species/similarSpecies";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +id: ?Number,
  +fetchiNatData: Function
}

const SimilarSpecies = ( { id, fetchiNatData }: Props ) => {
  const [state, setState] = useState( {
    similarSpecies: [],
    loading: true
  } );

  const resetState = () => {
    setState( {
      similarSpecies: [],
      loading: true
    } );
  };

  const fetchSimilarSpecies = () => {
    const params = {
      taxon_id: id,
      without_taxon_id: 43584,
      locale: i18n.currentLocale()
    };

    inatjs.identifications.similar_species( params ).then( ( response ) => {
      const shortenedList = response.results.slice( 0, 20 );
      const taxa = shortenedList.map( r => r.taxon );
      const taxaWithPhotos = [];
      taxa.forEach( ( taxon ) => {
        if ( taxon.default_photo && taxon.default_photo.medium_url ) {
          taxaWithPhotos.push( taxon );
        }
      } );

      setState( {
        similarSpecies: taxaWithPhotos,
        loading: false
      } );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch similar species" );
    } );
  };

  useEffect( () => {
    resetState();
    fetchSimilarSpecies();
  }, [id] );

  return (
    <>
      <View style={styles.similarSpeciesMargins}>
        <GreenText text={i18n.t( "species_detail.similar" ).toLocaleUpperCase()} />
      </View>
      <View style={[
        styles.similarSpeciesContainer,
        state.loading && styles.loading
      ]}
      >
        <SpeciesNearbyList fetchiNatData={() => fetchiNatData( "similarSpecies" )} taxa={state.similarSpecies} />
      </View>
    </>
  );
};

export default SimilarSpecies;
