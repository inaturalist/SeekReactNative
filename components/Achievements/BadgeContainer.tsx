import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/badges/achievements";

interface Badge {
  name: string;
  earnedIconName: string;
}

interface Props {
  data: Badge[];
  renderItem: ( item: Badge ) => React.ReactElement<any>;
}

const BadgeContainer = ( { data, renderItem }: Props ) => (
  <View testID="badge-container" style={viewStyles.imageContainer}>
    {data.filter( Boolean ).map( ( item, index ) => (
      <View key={`${item.name}-${item.earnedIconName}-${index}`}>
        {renderItem( item )}
      </View>
    ) )}
  </View>
);

export default BadgeContainer;
