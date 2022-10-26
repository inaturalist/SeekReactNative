// @flow

import * as React from "react";

import styles from "../../styles/uiComponents/descriptionText";
import StyledText from "./StyledText";

type Props = {
  +text: string,
  +allowFontScaling?: boolean
}

const DescriptionText = ( { text, allowFontScaling }: Props ): React.Node => (
  <StyledText allowFontScaling={allowFontScaling} style={styles.text}>
    {text}
  </StyledText>
);

DescriptionText.defaultProps = {
  allowFontScaling: true
};

export default DescriptionText;
