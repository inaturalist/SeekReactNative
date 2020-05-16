// @flow
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../../styles/global";
import SideDrawer from "./SideDrawer";
import LoginStack from "./LoginStack";
import Splash from "../Splash";
import OnboardingScreen from "../Onboarding/OnboardingScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
    text: colors.black
  }
};

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultConfig = {
  headerShown: false,
  cardStyleInterpolator: forFade
};

const Stack = createStackNavigator();

const linking = {
  prefixes: ["app://"]
};

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer theme={MyTheme} linking={linking}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Drawer"
          component={SideDrawer}
          options={defaultConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
