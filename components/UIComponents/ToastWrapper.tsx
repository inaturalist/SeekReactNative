import type { PropsWithChildren } from "react";
import React, { useRef, useEffect } from "react";
import type { ViewStyle } from "react-native";
import { Animated } from "react-native";

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
  const opacity = useRef( new Animated.Value( 0 ) ).current;

  useEffect( () => {
    if ( visible ) {
      Animated.sequence( [
        Animated.timing( opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        } ),
        Animated.delay( 2000 ),
        Animated.timing( opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        } ),
      ] ).start( ( ) => {
        if ( finishAnimation ) {
          finishAnimation( );
        }
      } );
    }
  }, [visible, opacity, finishAnimation] );

  if ( !visible ) {
    return null;
  }

  const animatedStyles = [{
    ...styles,
    opacity,
  }];

  return (
    <Animated.View testID={testID} style={animatedStyles}>
      {children}
    </Animated.View>
  );
};

export default ToastWrapper;
