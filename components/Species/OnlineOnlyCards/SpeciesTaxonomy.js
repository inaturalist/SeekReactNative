// @flow
import React from "react";
import { View, Text, Image } from "react-native";

import { capitalizeNames, getTaxonCommonName } from "../../../utility/helpers";
import styles from "../../../styles/species/speciesTaxonomy";
import icons from "../../../assets/icons";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";

type Props = {
  +ancestors: Array<Object>,
  +predictions: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors, predictions }: Props ) => {
  let marginLeft = 0;

  const rankNames = ["kingdom", "phylum", "class", "order", "family", "genus", "species"];
  let ranks = [70, 60, 50, 40, 30, 20, 10];

  const createAncestors = () => {
    const predictionAncestors = [];

    predictions.forEach( ( ancestor, i ) => {
      if ( !ranks.includes( ancestor.rank ) ) {
        return;
      }

      getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
        console.log( commonName, "common name" );
        const obj = {
          rank: rankNames[i - 1],
          name: ancestor.name,
          preferred_common_name: commonName || null
        };
        predictionAncestors.push( obj );
      } );
    } );
    return predictionAncestors;
  };

  console.log( createAncestors(), "ancestors" );

  return (
    <SpeciesDetailCard text="species_detail.taxonomy" hide={ancestors.length === 0}>
      {ancestors.map( ( ancestor, index ) => {
        marginLeft += 15;

        return (
          <View
            key={`taxon-${ancestor.rank}`}
            style={[{ marginLeft }, styles.row, index !== 0 && styles.marginTop]}
          >
            <Image source={icons.greenDot} style={styles.bullet} />
            <View>
              <Text style={styles.taxonomyHeader}>
                {ancestor.rank !== "species" && `${capitalizeNames( ancestor.rank )} `}
                {ancestor.name}
              </Text>
              <Text style={[styles.taxonomyHeader, styles.taxonomyText]}>
                {capitalizeNames( ancestor.preferred_common_name || ancestor.name )}
              </Text>
            </View>
          </View>
        );
      } )}
    </SpeciesDetailCard>
  );
};

export default SpeciesTaxonomy;
