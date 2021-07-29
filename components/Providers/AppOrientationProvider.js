// @flow

import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import type { Node } from "react";

import { AppOrientationContext } from "../UserContext";

type Props = {
  children: any
}

const landscape = ( ) => {
  const dim = Dimensions.get( "screen" );
  return dim.width >= dim.height;
};

const AppOrientationProvider = ( { children }: Props ): Node => {
  const [isLandscape, setIsLandscape] = useState( landscape );

const dim = Dimensions.get( "screen" );

  useEffect( ( ) => {
    // adapted from https://adrianhall.github.io/react%20native/2017/07/26/handling-orientation-changes-in-react-native/
    Dimensions.addEventListener( "change", ( ) => {
      setIsLandscape( landscape );
    } );
  }, [] );

  const appOrientationValue = {
    isLandscape,
    width: dim.width,
    height: dim.height
  };

  return (
    <AppOrientationContext.Provider value={appOrientationValue}>
      {children}
    </AppOrientationContext.Provider>
  );
};

export default AppOrientationProvider;
