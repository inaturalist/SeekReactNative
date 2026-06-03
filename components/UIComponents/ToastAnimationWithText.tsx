import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import StyledText from "./StyledText";
import ToastWrapper from "./ToastWrapper";

interface Props {
  testID?: string;
  visible: boolean;
  toastText: string;
  helpText: string;
  styles: object;
  finishAnimation?: () => void;
  rectangleColor: string | null;
  textStyles: object;
}

const ToastAnimationWithText = ( {
  testID,
  visible,
  toastText,
  helpText,
  finishAnimation,
  styles,
  rectangleColor,
  textStyles,
}: Props ) => {
  return (
    <ToastWrapper
      testID={testID}
      visible={visible}
      finishAnimation={finishAnimation}
      styles={styles}
    >
      <StyledText style={textStyles} >{helpText}</StyledText>
      <GreenRectangle text={toastText} color={rectangleColor} />
    </ToastWrapper>
  );
};

export default ToastAnimationWithText;
