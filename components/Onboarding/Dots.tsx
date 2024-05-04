import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/onboarding";

interface Props {
  index: number;
}

const Dots = ( { index }: Props ) => {
  const ActiveDot = <View style={[viewStyles.dot, viewStyles.activeDot]} />;
  const Dot = <View style={viewStyles.dot} />;

  const dots = [];

  for ( let key = 0; key < 3; key += 1 ) {
    dots.push( key === index
      ? React.cloneElement( ActiveDot, { key } )
      : React.cloneElement( Dot, { key } ) );
  }

  return (
    <View style={[viewStyles.pagination, viewStyles.center]}>
      {dots}
    </View>
  );
};

export default Dots;
