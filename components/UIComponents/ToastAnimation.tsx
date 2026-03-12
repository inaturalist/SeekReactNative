import React from "react";

import GreenRectangle from "../UIComponents/GreenRectangle";
import ToastWrapper from "./ToastWrapper";

interface Props {
  testID?: string;
  visible: boolean;
  toastText: string;
  styles: Object;
  finishAnimation?: ( ) => void;
  rectangleColor: string | null;
}

const ToastAnimation = ( {
  testID,
  visible,
  toastText,
  finishAnimation,
  styles,
  rectangleColor,
}: Props ) => {
  return (
    <ToastWrapper
      testID={testID}
      visible={visible}
      finishAnimation={finishAnimation}
      styles={styles}
    >
      <GreenRectangle text={toastText} color={rectangleColor} />
    </ToastWrapper>
  );
};

export default ToastAnimation;
