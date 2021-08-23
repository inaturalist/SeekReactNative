// @flow

import * as React from "react";
import { View } from "react-native";

import { AppOrientationContext } from "../UserContext";
import { viewStyles } from "../../styles/navigation";

type Props = {
  index: number
}

const CameraIndicator = ( { index }: Props ): React.Node => {
  const { width } = React.useContext( AppOrientationContext );

  const spaceFromSideOfScreen = width / 19;
  const size = width / 2.5;

  const cameraIndicator = {
    left: spaceFromSideOfScreen,
    width: size
  };

  const galleryIndicator = {
    right: spaceFromSideOfScreen,
    width: size
  };

  if ( index === 0 ) {
    return <View style={[viewStyles.indicator, cameraIndicator]} />;
  } else {
    return <View style={[viewStyles.indicator, galleryIndicator]} />;
  }
};

export default CameraIndicator;
