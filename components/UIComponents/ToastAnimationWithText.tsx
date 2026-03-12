import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import ToastWrapper from "./ToastWrapper";
import StyledText from "./StyledText";

interface Props {
  testID?: string;
  visible: boolean;
  toastText: string;
  helpText: string;
  styles: Object;
  finishAnimation?: () => void;
  rectangleColor: string | null;
  textStyles: Object;
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
