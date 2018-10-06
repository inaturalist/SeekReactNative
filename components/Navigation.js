import React from "react";
import { createStackNavigator } from "react-navigation";

import Splash from "./Splash";
import Warnings from "./Warnings";
import MainScreen from "./MainScreen";

const RootStack = createStackNavigator( {
  Home: { screen: Splash },
  Loading: { screen: Warnings },
  Main: { screen: MainScreen }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
