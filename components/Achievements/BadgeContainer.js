// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/badges/achievements";

type Props = {
  data: Array<Object>,
  renderItem: ( Object ) => any,
  containerKey: string
}

const BadgeContainer = ( { data, renderItem, containerKey }: Props ): React.Node => (
  <View style={[viewStyles.imageContainer]} key={containerKey}>
    {data.map( item => (
      <View key={item.earnedIconName}>
        {renderItem( item )}
      </View>
    ) )}
  </View>
);

export default BadgeContainer;
