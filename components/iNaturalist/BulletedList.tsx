import React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/iNaturalist/bulletedList";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "../UIComponents/StyledText";

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
