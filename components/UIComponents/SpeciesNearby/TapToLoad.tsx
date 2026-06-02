import React from "react";
import { Pressable } from "react-native";

import i18n from "../../../i18n";
import { baseTextStyles } from "../../../styles/textStyles";
import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/tapToLoad";
import StyledText from "../StyledText";

interface Props {
  handlePress: ( ) => void;
  backgroundColor?: string;
}

const TapToLoad = ( { handlePress, backgroundColor }: Props ) => (
  <Pressable
    onPress={handlePress}
    style={[
      viewStyles.center,
      viewStyles.speciesNearbyContainer,
      backgroundColor === "white" && viewStyles.challengeContainer,
    ]}
  >
    <StyledText
      style={[
        textStyles.text,
        backgroundColor === "white" ? baseTextStyles.body : baseTextStyles.bodyWhite,
      ]}>
        {i18n.t( "results.tap" )}
    </StyledText>
  </Pressable>
);

export default TapToLoad;

