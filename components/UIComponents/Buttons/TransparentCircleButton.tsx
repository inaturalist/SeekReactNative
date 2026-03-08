import React from "react";
import type { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { Image, Pressable, View } from "react-native";

import viewStyles from "../../../styles/uiComponents/buttons/transparentCircleButton";

interface Props {
  onPress: ( _event?: GestureResponderEvent ) => void;
  accessibilityHint?: string;
  accessibilityLabel: string;
  source: ImageSourcePropType;
  testID?: string;
}

const TransparentCircleButton = ( {
  onPress,
  accessibilityLabel,
  accessibilityHint,
  source,
  testID,
}: Props ) => (
  <Pressable
    accessibilityHint={accessibilityHint}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    onPress={onPress}
    style={( { pressed } ) => [
      viewStyles.wrapperStyle,
      { opacity: pressed ? 0.5 : 1 },
    ]}
    testID={testID}
  >
    <View>
      <Image source={source} width={20} height={20} />
    </View>
  </Pressable>
);

export default TransparentCircleButton;
