// @flow

import React from "react";
import {
  FlatList,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations";
import ObservationCard from "./ObservationCard";
import taxaIds from "../../utility/iconicTaxonDictById";

type Props = {
  observations: Array<Object>,
  id: number,
  navigation: any
}

const ObservationList = ( { observations, id, navigation }: Props ) => (
  <View style={styles.secondTextContainer}>
    <Text style={styles.secondHeaderText}>
      {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
    </Text>
    {observations.length > 0 ? (
      <FlatList
        data={observations}
        keyExtractor={item => `${item.taxon.name}-${item.taxon.id}`.toString()}
        initialNumToRender={3}
        renderItem={( { item } ) => (
          <ObservationCard item={item} navigation={navigation} />
        ) }
      />
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
        </Text>
      </View>
    )}
  </View>
);

export default ObservationList;
