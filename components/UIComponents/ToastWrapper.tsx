import type { PropsWithChildren } from "react";
import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

interface Props extends PropsWithChildren {
  startAnimation: boolean;
  finishAnimation?: ( ) => void;
  styles: Object;
}

const ToastWrapper = ( {
  children,
  startAnimation,
  finishAnimation,
  styles,
}: Props ) => {
  const fadeOut = useRef( new Animated.Value( 0 ) ).current;

  useEffect( ( ) => {
    let isCurrent = true;
    const entrance = {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    };

    const exit = {
      toValue: 0,
      delay: 2000,
      duration: 200,
      useNativeDriver: true,
    };

    if ( startAnimation && isCurrent ) {
      Animated.sequence( [
        Animated.timing( fadeOut, entrance ),
        Animated.timing( fadeOut, exit ),
      ] ).start( ( { finished } ) => {
        if ( finished && finishAnimation ) {
          finishAnimation( );
        }
      } );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [fadeOut, startAnimation, finishAnimation] );

  const animatedStyles = [{
    ...styles,
    opacity: fadeOut,
  }];

  return (
    <Animated.View style={animatedStyles}>
      {children}
    </Animated.View>
  );
};

export default ToastWrapper;
