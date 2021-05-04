// @flow

import * as React from "react";
import { FlatList } from "react-native";

import { viewStyles } from "../../styles/badges/achievements";

type Props = {
  data: Array<Object>,
  renderItem: ( Object ) => any
}

const BadgeList = ( { data, renderItem }: Props ): React.Node => (
  <FlatList
    contentContainerStyle={viewStyles.center}
    numColumns={3}
    data={data}
    keyExtractor={( item, index ) => `${index.toString( )}`}
    renderItem={renderItem}
  />
);

export default BadgeList;
