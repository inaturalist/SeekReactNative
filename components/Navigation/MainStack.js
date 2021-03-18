// @flow
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FooterTabNav from "./FooterTabs";
// import Match from "../Match/MatchScreen";

const Stack = createStackNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultConfig = {
  headerShown: false,
  cardStyleInterpolator: forFade
};

const screenOptions = { gestureEnabled: false };

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="MainStack"
    screenOptions={screenOptions}
  >
    <Stack.Screen
      name="MainTab"
      component={FooterTabNav}
      options={defaultConfig}
    />
  </Stack.Navigator>
);

export default MainStack;
