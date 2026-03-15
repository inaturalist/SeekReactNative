import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import type { ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface Props extends PropsWithChildren {
  testID?: string;
  visible: boolean;
  finishAnimation?: ( ) => void;
  styles: ViewStyle;
}

const ToastWrapper = ( {
  testID,
  children,
  visible,
  finishAnimation,
  styles,
}: Props ) => {
  const opacity = useSharedValue( 0 );
  const animatedStyle = useAnimatedStyle( ( ) => ( { opacity: opacity.value } ) );

  useEffect( () => {
    if ( visible ) {
      opacity.set(
        withSequence(
          withTiming( 1, { duration: 200 } ),
          withDelay(
            2000,
            withTiming( 0, { duration: 200 }, ( finished ) => {
              if ( finished && finishAnimation ) {
                scheduleOnRN( finishAnimation );
              }
            } ),
          ),
        ),
      );
    }
  }, [visible, finishAnimation, opacity] );

  if ( !visible ) {
    return null;
  }

  return (
    <Animated.View testID={testID} style={[styles, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default ToastWrapper;
