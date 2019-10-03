// @flow
import React from "react";
import { View, Text, Image } from "react-native";

import { capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/species/speciesTaxonomy";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +ancestors: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors }: Props ) => {
  const taxonomy = [];
  let margin = 0;

  if ( ancestors.length > 0 ) {
    ancestors.forEach( ( ancestor, i ) => {
      const rank = (
        <View key={`taxon-${ancestor.rank}-${i}`} style={[{ marginLeft: margin }, styles.taxonomyRow]}>
          <Image source={icons.taxonomyCircle} style={styles.bullets} />
          <View>
            <Text style={styles.taxonomyHeader}>
              {ancestor.rank !== "species" ? capitalizeNames( ancestor.rank ) : null}
              {ancestor.rank !== "species" ? " " : null}
              {ancestor.name}
            </Text>
            <Text numOfLines={1} style={styles.taxonomyText}>
              {capitalizeNames( ancestor.preferred_common_name || ancestor.name )}
            </Text>
          </View>
        </View>
      );

      margin += 15;

      taxonomy.push( rank );
    } );
  }

  return (
    <View>
      <View style={styles.headerMargins}>
        <GreenText
          text={i18n.t( "species_detail.taxonomy" ).toLocaleUpperCase()}
        />
      </View>
      {taxonomy}
    </View>
  );
};

export default SpeciesTaxonomy;
