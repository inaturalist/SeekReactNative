import React from "react";
import { createStackNavigator } from "react-navigation";

import Splash from "./Splash";
import Warnings from "./Warnings";

const RootStack = createStackNavigator( {
  Home: { screen: Splash },
  Loading: { screen: Warnings }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
