// @flow

import * as React from "react";
import { View } from "react-native";
import Checkbox from "react-native-check-box";

import styles from "../../../styles/auth/signup";
import { colors } from "../../../styles/global";
import StyledText from "../../UIComponents/StyledText";

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
}: Props ): React.Node => (
  <View style={[styles.row, styles.margin]}>
    <Checkbox
      checkBoxColor={colors.checkboxColor}
      isChecked={isChecked}
      onClick={() => toggleCheckbox()}
      style={styles.checkBox}
    />
    {children || (
      <StyledText allowFontScaling={false} style={styles.licenseText}>
        {text}
      </StyledText>
    )}
  </View>
);

export default CheckboxRow;
