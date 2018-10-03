import React from "react";
import { createStackNavigator } from "react-navigation";

import Splash from "./Splash";
import Warnings from "./Warnings";
import Challenges from "./Challenges";

const RootStack = createStackNavigator( {
  Home: { screen: Splash },
  Loading: { screen: Warnings },
  Main: { screen: Challenges }
}, {
  navigationOptions: { header: null }
} );

export default App = () => (
  <RootStack />
);
