// @flow
import React from "react";
import { View, Text, Image } from "react-native";

import { capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/species/speciesTaxonomy";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +ancestors: Array<Object>
};

const SpeciesTaxonomy = ( { ancestors }: Props ) => {
  let marginLeft = 0;

  return (
    <>
      <View style={styles.headerMargins}>
        <GreenText text="species_detail.taxonomy" />
      </View>
      {ancestors.map( ( ancestor, index ) => {
        marginLeft += 15;

        return (
          <View
            key={`taxon-${ancestor.rank}`}
            style={[{ marginLeft }, styles.row, index !== 0 && styles.marginTop]}
          >
            <Image source={icons.taxonomyCircle} style={styles.bullet} />
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
    </>
  );
};

export default SpeciesTaxonomy;
