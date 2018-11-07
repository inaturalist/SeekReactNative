import React from "react";
import { createStackNavigator } from "react-navigation";

import SplashScreen from "./SplashScreen";
import WarningsScreen from "./WarningsScreen";
import MainScreen from "./MainScreen";
import Camera from "./Camera/Camera";
import LocationPickerScreen from "./Challenges/LocationPickerScreen";
import TaxonPickerScreen from "./Challenges/TaxonPickerScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";

const RootStack = createStackNavigator( {
  Home: { screen: SplashScreen },
  Warnings: { screen: WarningsScreen },
  Main: { screen: MainScreen },
  Camera: { screen: Camera },
  Location: { screen: LocationPickerScreen },
  Taxon: { screen: TaxonPickerScreen },
  Results: { screen: ChallengeResults },
  Species: { screen: SpeciesDetail },
  YourCollection: { screen: YourCollection }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
