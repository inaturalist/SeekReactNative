import React from "react";
import { FlatList } from "react-native";

import styles from "../../../styles/uiComponents/speciesNearby/speciesNearbyList";
import SpeciesImageCell from "./SpeciesImageCell";
import EmptyList from "./EmptyList";

type Props = {
  +taxa: Array,
  +fetchiNatData: ?Function
}

const SpeciesNearbyList = ( { taxa, fetchiNatData }: Props ) => (
  <FlatList
    alwaysBounceHorizontal
    bounces={taxa.length > 0}
    contentContainerStyle={taxa.length > 0 && styles.taxonList}
    data={taxa}
    getItemLayout={( data, index ) => (
      // skips measurement of dynamic content for faster loading
      {
        length: ( 28 + 108 ),
        offset: ( 28 + 108 ) * index,
        index
      }
    )}
    horizontal
    initialNumToRender={3}
    keyExtractor={taxon => `species-${taxon.id}`}
    ListEmptyComponent={() => <EmptyList />}
    renderItem={( { item } ) => <SpeciesImageCell item={item} fetchiNatData={fetchiNatData} />}
  />
);

export default SpeciesNearbyList;
