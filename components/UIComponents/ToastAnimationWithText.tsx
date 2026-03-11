import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import ToastWrapper from "./ToastWrapper";
import StyledText from "./StyledText";

interface Props {
  visible: boolean;
  toastText: string;
  helpText: string;
  styles: Object;
  finishAnimation?: () => void;
  rectangleColor: string | null;
  textStyles: Object;
}

const ToastAnimationWithText = ( {
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
