import React from "react";
import { createStackNavigator } from "react-navigation";

import Splash from "./Splash";
import Warnings from "./Warnings";
import MainScreen from "./MainScreen";
import CameraScreen from "./CameraScreen";
import CameraCaptureScreen from "./CameraCaptureScreen";
import GalleryScreen from "./GalleryScreen";

const RootStack = createStackNavigator( {
  Home: { screen: Splash },
  Loading: { screen: Warnings },
  Main: { screen: MainScreen },
  Camera: { screen: CameraScreen },
  CameraCapture: { screen: CameraCaptureScreen },
  Gallery: { screen: GalleryScreen }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
