// @flow

import React from "react";
import { TextInput } from "react-native";

import styles from "../../styles/posting/postToiNat";
import { colors } from "../../styles/global";
import i18n from "../../i18n";

type Props = {
  description: ?string,
  updateObservation: ( string, string ) => void
}

const Notes = ( { description, updateObservation }: Props ) => (
  <TextInput
    keyboardType="default"
    multiline
    onChangeText={text => updateObservation( "description", text )}
    placeholder={i18n.t( "posting.notes" )}
    placeholderTextColor={colors.placeholderGray}
    style={styles.inputField}
  />
);

export default Notes;
