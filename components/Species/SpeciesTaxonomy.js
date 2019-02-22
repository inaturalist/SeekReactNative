// @flow
import React from "react";
import { View, Text } from "react-native";

import { capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/species/speciesTaxonomy";

type Props = {
  ancestors: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors }: Props ) => {
  const taxonomy = [];
  let margin = 0;

  if ( ancestors.length > 0 ) {
    ancestors.forEach( ( ancestor ) => {
      const rank = (
        <View key={`taxon-${ancestor.rank}`} style={{ marginLeft: margin }}>
          {ancestor.preferred_common_name ? (
            <View style={styles.taxonomyRow}>
              <Text style={styles.bullets}>&#8226;</Text>
              <View>
                <Text style={styles.taxonomyHeader}>
                  {capitalizeNames( ancestor.rank )}
                  {" "}
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
