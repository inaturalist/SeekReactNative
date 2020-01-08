// @flow

import React from "react";
import {
  TextInput,
  Platform
} from "react-native";

import styles from "../../styles/uiComponents/inputField";

type Props = {
  +handleTextChange: Function,
  +placeholder: string,
  +text: string,
  +type: string
}

const InputField = ( {
  handleTextChange,
  placeholder,
  text,
  type
}: Props ) => {
  let keyboardType = "default";

  if ( type === "emailAddress" ) {
    keyboardType = "email-address";
  } else if ( Platform.OS === "android" && type !== "password" ) {
    // adding this to turn off autosuggestions on Android
    keyboardType = "visible-password";
  }

  return (
    <TextInput
      accessibilityLabel={text}
      accessible
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus={type !== "password"}
      keyboardType={keyboardType}
      onChangeText={value => handleTextChange( value )}
      placeholder={placeholder}
      placeholderTextColor="#828282"
      secureTextEntry={type === "password"}
      style={styles.inputField}
      textContentType={type}
      value={text}
    />
  );
};

export default InputField;
