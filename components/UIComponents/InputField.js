// @flow

import * as React from "react";
import { TextInput, Platform } from "react-native";

import styles from "../../styles/uiComponents/inputField";
import { colors } from "../../styles/global";

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
}: Props ): React.Node => {
  let keyboardType = "default";

  if ( type === "emailAddress" ) {
    keyboardType = "email-address";
  } else if ( Platform.OS === "android" && type !== "password" ) {
    // adding this to turn off autosuggestions on Android
    keyboardType = "visible-password";
  }

  return (
    // $FlowFixMe
    <TextInput
      // don't use accessibility label here because screen reader
      // should read the text value (editable content) instead
      autoCapitalize="none"
      autoCorrect={false}
      // spellCheck off is required for iOS 15
      // https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12
      spellCheck={false}
      autoFocus={type !== "password"}
      keyboardType={keyboardType}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholderGray}
      secureTextEntry={type === "password"}
      selectTextOnFocus={Platform.OS === "android"}
      style={styles.inputField}
      textContentType={type} // iOS only
      value={text}
      testID={type}
    />
  );
};

export default InputField;
