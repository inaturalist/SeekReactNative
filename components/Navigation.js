import React from "react";
import { createStackNavigator } from "react-navigation";

import Splash from "./Splash";
import Warnings from "./Warnings";
import MainScreen from "./MainScreen";
import Camera from "./Camera/Camera";
import CameraCaptureScreen from "./Camera/CameraCaptureScreen";
import GalleryScreen from "./Camera/GalleryScreen";
import LocationPicker from "./Challenges/LocationPicker";
import TaxonPicker from "./Challenges/TaxonPicker";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";

const RootStack = createStackNavigator( {
  Home: { screen: Splash },
  Loading: { screen: Warnings },
  Main: { screen: MainScreen },
  Camera: { screen: Camera },
  CameraCapture: { screen: CameraCaptureScreen },
  Gallery: { screen: GalleryScreen },
  Location: { screen: LocationPicker },
  Taxon: { screen: TaxonPicker },
  Results: { screen: ChallengeResults },
  Species: { screen: SpeciesDetail },
  YourCollection: { screen: YourCollection }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
