// @flow

import * as React from "react";
import { View, Text } from "react-native";

import { viewStyles, textStyles } from "../../styles/iNaturalist/bulletedList";
import i18n from "../../i18n";

type Props = {
  text: string
}

const BulletedList = ( { text }: Props ): React.Node => (
  <View key={text} style={viewStyles.bulletContainer}>
    <Text style={textStyles.bulletPoints}>
      &#8226;
    </Text>
    <Text style={[textStyles.text, textStyles.bulletText]}>
      {i18n.t( text )}
    </Text>
  </View>
);

export default BulletedList;
