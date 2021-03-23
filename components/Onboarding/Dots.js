// @flow
import * as React from "react";
import { View } from "react-native";

import styles from "../../styles/onboarding";

type Props = {
  index: number
}

const Dots = ( { index }: Props ): React.Node => {
  const ActiveDot = <View style={[styles.dot, styles.activeDot]} />;
  const Dot = <View style={styles.dot} />;

  const dots = [];

  for ( let key = 0; key < 3; key += 1 ) {
    dots.push( key === index
      ? React.cloneElement( ActiveDot, { key } )
      : React.cloneElement( Dot, { key } ) );
  }

  return (
    <View style={[styles.pagination, styles.center]}>
      {dots}
    </View>
  );
};

export default Dots;
