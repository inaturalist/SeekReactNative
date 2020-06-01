// @flow
import React from "react";
import { View, Text, Image } from "react-native";

import { capitalizeNames } from "../../../utility/helpers";
import styles from "../../../styles/species/speciesTaxonomy";
import icons from "../../../assets/icons";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";

type Props = {
  +ancestors: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors }: Props ) => {
  let marginLeft = 0;

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
