// @flow

import * as React from "react";
import { Pressable } from "react-native";

import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/tapToLoad";
import StyledText from "../StyledText";

type Props = {
  handlePress: ( ) => void,
  backgroundColor?: string
}

const TapToLoad = ( { handlePress, backgroundColor }: Props ): React.Node => (
  <Pressable
    onPress={handlePress}
    style={[
      viewStyles.center,
      viewStyles.speciesNearbyContainer,
      backgroundColor === "white" && viewStyles.challengeContainer
    ]}
  >
    <StyledText
      style={[
        textStyles.text,
        backgroundColor === "white" && textStyles.challengeText
      ]}>
        {i18n.t( "results.tap" )}
    </StyledText>
  </Pressable>
);

export default TapToLoad;

