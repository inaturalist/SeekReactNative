import React from "react";
import type { TakePhotoOptions } from "react-native-vision-camera";

import i18n from "../../../i18n";
import TransparentCircleButton from "../../UIComponents/Buttons/TransparentCircleButton";
import icons from "../../../assets/icons";

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
      source = icons.cameraHelp;
      testID = "flash-button-label-flash";
      accessibilityHint = i18n.t( "Disable-flash" );
      break;
    default: // default to off if no flash
      source = icons.iNat_valueprop_bullet_1;
      testID = "flash-button-label-flash-off";
      accessibilityHint = i18n.t( "Enable-flash" );
  }

  return (
    <TransparentCircleButton
      onPress={toggleFlash}
      testID={testID}
      accessibilityLabel={i18n.t( "Flash" )}
      accessibilityHint={accessibilityHint}
      source={source}
    />
  );
};

export default Flash;
