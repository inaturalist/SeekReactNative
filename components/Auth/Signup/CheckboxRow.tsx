import * as React from "react";
import { View } from "react-native";
import Checkbox from "react-native-check-box";

import styles from "../../../styles/auth/signup";
import { colors } from "../../../styles/global";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  isChecked: boolean;
  toggleCheckbox: () => void;
  text?: string;
  children?: React.ReactNode;
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
      <StyledText allowFontScaling={false} style={[baseTextStyles.body, styles.licenseText]}>
        {text}
      </StyledText>
    )}
  </View>
);

export default CheckboxRow;
