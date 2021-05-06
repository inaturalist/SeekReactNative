
import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

import GreenRectangle from "../UIComponents/GreenRectangle";

type Props = {
  startAnimation: boolean,
  delay: number,
  toastText: string,
  styles: Array<Object>,
  finishAnimation?: ( ) => void,
  rectangleColor?: string
}

const ToastAnimation = ( {
  startAnimation,
  delay,
  toastText,
  finishAnimation,
  styles,
  rectangleColor
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
        if ( finished && finishAnimation ) {
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
      <GreenRectangle text={toastText} color={rectangleColor} />
    </Animated.View>
  );
};

export default ToastAnimation;
