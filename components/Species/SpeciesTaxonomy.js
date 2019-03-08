// @flow
import React from "react";
import { View, Text, Image } from "react-native";

import { capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/species/speciesTaxonomy";
import icons from "../../assets/icons";

type Props = {
  ancestors: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors }: Props ) => {
  const taxonomy = [];
  let margin = 0;

  if ( ancestors.length > 0 ) {
    ancestors.forEach( ( ancestor, i ) => {
      const rank = (
        <View key={`taxon-${ancestor.rank}${i}`} style={{ marginLeft: margin }}>
          {ancestor.preferred_common_name ? (
            <View style={styles.taxonomyRow}>
              <Image source={icons.taxonomyCircle} style={styles.bullets} />
              <View>
                <Text style={styles.taxonomyHeader}>
                  {ancestor.rank !== "species" ? capitalizeNames( ancestor.rank ) : null}
                  {ancestor.rank !== "species" ? " " : null}
                  {ancestor.name}
                </Text>
                <Text numOfLines={1} style={styles.taxonomyText}>
                  {capitalizeNames( ancestor.preferred_common_name )}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      );
      if ( ancestor.preferred_common_name ) {
        margin += 15;
      }

      taxonomy.push( rank );
    } );
  }

  return (
    taxonomy
  );
};

export default SpeciesTaxonomy;
