// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/badges/achievements";

type Props = {
  data: Array<Object>,
  renderItem: ( Object ) => any
}

const BadgeContainer = ( { data, renderItem }: Props ): React.Node => (
  <View style={[viewStyles.imageContainer]}>
    {data.map( item => (
      <View key={item.earnedIconName}>
        {renderItem( item )}
      </View>
    ) )}
  </View>
);

export default BadgeContainer;
