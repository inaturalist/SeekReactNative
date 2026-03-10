import React from "react";
import type { TakePhotoOptions } from "react-native-vision-camera";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import TransparentCircleButton from "../../UIComponents/Buttons/TransparentCircleButton";

interface Props {
  toggleFlash: ( ) => void;
  hasFlash?: boolean;
  takePhotoOptions: TakePhotoOptions;
}

const Flash = ( {
  toggleFlash,
  hasFlash,
  takePhotoOptions,
}: Props ) => {
  if ( !hasFlash ) return null;
  let testID = "";
  let accessibilityHint = "";
  let source;
  switch ( takePhotoOptions.flash ) {
    case "on":
      source = icons.flash_on;
      testID = "flash-button-label-flash";
      accessibilityHint = i18n.t( "accessibility.disable_flash" );
      break;
    default: // default to off if no flash
      source = icons.flash_off;
      testID = "flash-button-label-flash-off";
      accessibilityHint = i18n.t( "accessibility.enable_flash" );
  }

  return (
    <TransparentCircleButton
      onPress={toggleFlash}
      testID={testID}
      accessibilityLabel={i18n.t( "accessibility.flash" )}
      accessibilityHint={accessibilityHint}
      source={source}
    />
  );
};

export default Flash;
