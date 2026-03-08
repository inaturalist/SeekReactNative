import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import ToastWrapper from "./ToastWrapper";
import StyledText from "./StyledText";

interface Props {
  startAnimation: boolean;
  toastText: string;
  helpText: string;
  styles: Object;
  finishAnimation?: () => void;
  rectangleColor: string | null;
}

const ToastAnimation = ( {
  startAnimation,
  toastText,
  helpText,
  finishAnimation,
  styles,
  rectangleColor,
}: Props ) => {
  return (
    <ToastWrapper
      startAnimation={startAnimation}
      finishAnimation={finishAnimation}
      styles={styles}
    >
      <StyledText>{helpText}</StyledText>
      <GreenRectangle text={toastText} color={rectangleColor} />
    </ToastWrapper>
  );
};

export default ToastAnimation;
