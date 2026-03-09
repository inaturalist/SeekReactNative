import React from "react";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import TransparentCircleButton from "../../UIComponents/Buttons/TransparentCircleButton";

interface Props {
  toggleLocation: ( ) => void;
  useLocation?: boolean;
}

const Location = ( {
  toggleLocation,
  useLocation,
}: Props ) => {
  let testID = "";
  let accessibilityHint = "";
  let source;
  if ( useLocation ) {
    source = icons.location_on;
    testID = "location-button-label-location";
    accessibilityHint = i18n.t( "accessibility.disable_location" );
  } else {
    source = icons.location_off;
    testID = "location-button-label-location-off";
    accessibilityHint = i18n.t( "accessibility.disable_location" );
  }

  return (
    <TransparentCircleButton
      onPress={toggleLocation}
      testID={testID}
      accessibilityLabel={i18n.t( "accessibility.location" )}
      accessibilityHint={accessibilityHint}
      source={source}
    />
  );
};

export default Location;
