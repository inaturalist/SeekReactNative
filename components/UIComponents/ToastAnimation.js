
import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

import GreenRectangle from "../UIComponents/GreenRectangle";

type Props = {
  startAnimation: boolean,
  delay: number,
  finishAnimation: ( ) => void,
  toastText: string,
  styles: Array<Object>
}

const ToastAnimation = ( {
  startAnimation,
  delay,
  toastText,
  finishAnimation,
  styles
}: Props ) => {
  const fadeOut = useRef( new Animated.Value( 0 ) ).current;

  useEffect( ( ) => {
    let isCurrent = true;
    const entrance = {
      toValue: 1,
      duration: 0,
      useNativeDriver: true
    };

    const exit = {
      toValue: 0,
      delay,
      duration: 200,
      useNativeDriver: true
    };

    if ( startAnimation && isCurrent ) {
      Animated.sequence( [
        Animated.timing( fadeOut, entrance ),
        Animated.timing( fadeOut, exit )
      ] ).start( ( { finished } ) => {
        if ( finished ) {
          finishAnimation( );
        }
      } );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [fadeOut, startAnimation, finishAnimation, delay] );

  const animatedStyles = styles.concat( { opacity: fadeOut } );

  return (
    <Animated.View style={animatedStyles}>
      <GreenRectangle text={toastText} />
    </Animated.View>
  );
};

export default ToastAnimation;
