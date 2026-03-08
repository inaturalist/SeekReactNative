import React from "react";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import TransparentCircleButton from "../../UIComponents/Buttons/TransparentCircleButton";

interface Props {
  flipCamera: ( ) => void;
}

const CameraFlip = ( {
  flipCamera,
}: Props ) => {
  return (
    <TransparentCircleButton
      onPress={flipCamera}
      accessibilityLabel={i18n.t( "accessibility.flip_camera" )}
      accessibilityHint={i18n.t( "accessibility.use_other_camera" )}
      source={icons.iNat_valueprop_bullet_1}
    />
  );
};

export default CameraFlip;
