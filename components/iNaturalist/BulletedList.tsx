import React from "react";
import { View } from "react-native";

import { viewStyles, textStyles } from "../../styles/iNaturalist/bulletedList";
import i18n from "../../i18n";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  text: string;
}

const BulletedList = ( { text }: Props ) => (
  <View key={text} style={viewStyles.bulletContainer}>
    <StyledText style={textStyles.bulletPoints}>
      &#8226;
    </StyledText>
    <StyledText style={[baseTextStyles.body, textStyles.bulletText]}>
      {i18n.t( text )}
    </StyledText>
  </View>
);

export default BulletedList;
