import type { PropsWithChildren } from "react";
import React, { useRef, useState } from "react";
import type { GestureResponderEvent, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";

interface Props extends PropsWithChildren {
  accessibilityLabel?: string;
  accessible?: boolean;
  testID?: string;
  onPress: ( _event?: GestureResponderEvent ) => void;
  style?: ViewStyle;
  disabled: boolean;
  debounceTime?: number;
  preventMultipleTaps?: boolean;
}

const TouchableOpacityWithDebounce = ( {
  accessibilityLabel,
  accessible,
  testID,
  onPress,
  style,
  disabled,
  children,
  debounceTime = 400,
  preventMultipleTaps = true
}: Props ) => {
  const [isProcessing, setIsProcessing] = useState( false );
  const onPressRef = useRef( onPress );

  onPressRef.current = onPress;

  const handleOnPress = ( event?: GestureResponderEvent ) => {
    if ( !preventMultipleTaps ) {
      onPressRef.current( event );
      return;
    }

    if ( isProcessing ) {return;}

    setIsProcessing( true );

    onPressRef.current( event );

    setTimeout( ( ) => {
      setIsProcessing( false );
    }, debounceTime );
  };

  const isDisabled = disabled || ( preventMultipleTaps && isProcessing );

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      accessibilityState={{ disabled }}
      style={style}
      testID={testID}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      {children}
    </TouchableOpacity>
  );
};

export default TouchableOpacityWithDebounce;
