// @flow

import React from "react";
import { View, Text } from "react-native";
import Checkbox from "react-native-check-box";

import styles from "../../../styles/auth/signup";
import { colors } from "../../../styles/global";

type Props = {
  isChecked: boolean,
  toggleCheckbox: Function,
  text?: string,
  children?: any
}

const CheckboxRow = ( {
  isChecked,
  toggleCheckbox,
  text,
  children
}: Props ) => (
  <View style={[styles.row, styles.margin]}>
    <Checkbox
      checkBoxColor={colors.checkboxColor}
      isChecked={isChecked}
      onClick={() => toggleCheckbox()}
      style={styles.checkBox}
    />
    {children || (
      <Text allowFontScaling={false} style={styles.licenseText}>
        {text}
      </Text>
    )}
  </View>
);

export default CheckboxRow;
