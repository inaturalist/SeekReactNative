import * as React from "react";
import { TextInput } from "react-native";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import styles from "../../styles/posting/postToiNat";
import { baseTextStyles } from "../../styles/textStyles";

type description = "description";
interface Props {
  updateObservation: ( description: description, text: string ) => void;
}

const Notes = ( { updateObservation }: Props ) => (
  <TextInput
    keyboardType="default"
    multiline
    onChangeText={text => updateObservation( "description", text )}
    placeholder={i18n.t( "posting.notes" )}
    placeholderTextColor={colors.placeholderGray}
    style={[baseTextStyles.inputField, styles.inputField]}
  />
);

export default Notes;
