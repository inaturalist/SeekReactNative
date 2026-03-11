import type { PropsWithChildren } from "react";
import React, { useRef, useEffect } from "react";
import type { ViewStyle } from "react-native";
import { Animated } from "react-native";

interface Props extends PropsWithChildren {
  startAnimation: boolean;
  finishAnimation?: ( ) => void;
  styles: ViewStyle;
}

const ToastWrapper = ( {
  children,
  startAnimation,
  finishAnimation,
  styles,
}: Props ) => {
  const opacity = useRef( new Animated.Value( 0 ) ).current;

  useEffect( () => {
    if ( startAnimation ) {
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
  }, [startAnimation, opacity, finishAnimation] );

  if ( !startAnimation ) {
    return null;
  }

  const animatedStyles = [{
    ...styles,
    opacity,
  }];

  return (
    <Animated.View style={animatedStyles}>
      {children}
    </Animated.View>
  );
};

export default ToastWrapper;
