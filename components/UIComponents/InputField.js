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
  +type: string,
  +secureTextEntry: ?boolean
}

const InputField = ( {
  handleTextChange,
  placeholder,
  secureTextEntry,
  text,
  type
}: Props ) => {
  let keyboardType = "default";

  if ( type === "email" ) {
    keyboardType = "email-address";
  }

  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus
      keyboardType={Platform.OS === "android" ? "visible-password" : keyboardType} // adding this to turn off autosuggestions on Android
      onChangeText={ value => handleTextChange( value )}
      placeholder={placeholder}
      placeholderTextColor="#828282"
      secureTextEntry={secureTextEntry}
      style={styles.inputField}
      textContentType={type}
      value={text}
    />
  );
};

export default InputField;
