// @flow

import React from "react";
import { TextInput } from "react-native";

import styles from "../../styles/posting/postToiNat";
import i18n from "../../i18n";

type Props = {
  description: ?string,
  updateDescription: Function
}

const Notes = ( { description, updateDescription }: Props ) => (
  <TextInput
    keyboardType="default"
    multiline
    onChangeText={value => updateDescription( value )}
    placeholder={i18n.t( "posting.notes" )}
    placeholderTextColor="#828282"
    style={styles.inputField}
    value={description}
  />
);

export default Notes;
