// @flow

import * as React from "react";
import { Text, Pressable } from "react-native";

import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/tapToLoad";

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
    <Text
      style={[
        textStyles.text,
        backgroundColor === "white" && textStyles.challengeText
      ]}>
        {i18n.t( "results.tap" )}
    </Text>
  </Pressable>
);

export default TapToLoad;

