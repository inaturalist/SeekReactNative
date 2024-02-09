// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/badges/achievements";

type Props = {
  data: Array<Object>,
  renderItem: ( Object ) => any
}

const BadgeContainer = ( { data, renderItem }: Props ): React.Node => (
  <View testID="badge-container" style={[viewStyles.imageContainer]}>
    {data.map( ( item, index ) => (
      <View key={`${item.name}-${item.earnedIconName}-${index}`}>
        {renderItem( item )}
      </View>
    ) )}
  </View>
);

export default BadgeContainer;
