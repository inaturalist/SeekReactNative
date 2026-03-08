import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import ToastWrapper from "./ToastWrapper";

interface Props {
  startAnimation: boolean;
  toastText: string;
  styles: Object;
  finishAnimation?: ( ) => void;
  rectangleColor: string | null;
}

const ToastAnimation = ( {
  startAnimation,
  toastText,
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
      <GreenRectangle text={toastText} color={rectangleColor} />
    </ToastWrapper>
  );
};

export default ToastAnimation;
