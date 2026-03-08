import React from "react";
import type { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { Image, Pressable, View } from "react-native";

export const CIRCLE_OPTIONS_CLASSES = [
  "bg-black/50",
  "items-center",
  "justify-center",
  "rounded-full",
].join( " " );

export const CIRCLE_SIZE = "h-[40px] w-[40px]";

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
  // <INatIconButton
  //   className={classnames( CIRCLE_OPTIONS_CLASSES, optionalClasses, CIRCLE_SIZE )}
  //   onPress={onPress}
  //   accessibilityLabel={accessibilityLabel}
  //   accessibilityHint={accessibilityHint}
  //   icon={icon}
  //   color={colors.white}
  //   size={20}
  //   testID={testID}
  // />
  <Pressable
    accessibilityHint={accessibilityHint}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    onPress={onPress}
    // style={( { pressed } ) => [...wrapperStyle, { opacity: getOpacity( pressed ) }]}
    testID={testID}
  >
    <View>
      <Image source={source} />
    </View>
  </Pressable>
);

export default TransparentCircleButton;
