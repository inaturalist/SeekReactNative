// @flow

import React from "react";
import {
  FlatList,
  Text,
  View
} from "react-native";

import styles from "../../styles/menu/observations";
import ObservationCard from "./ObservationCard";

type Props = {
  observations: Array<Object>,
  navigation: any
}

const ObservationList = ( { observations, navigation }: Props ) => (
  <View style={styles.secondTextContainer}>
    <Text style={styles.secondHeaderText}>MAMMALS</Text>
    <FlatList
      data={observations}
      keyExtractor={item => item.taxon.id.toString()}
      renderItem={( { item } ) => (
        <ObservationCard item={item} navigation={navigation} />
      ) }
    />
  </View>
);

export default ObservationList;
