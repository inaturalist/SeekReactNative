// @flow
import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../../styles/global";
import Drawer from "./SideDrawer";
import Login from "./LoginStack";
import Splash from "../Splash";
import Onboarding from "../Onboarding/OnboardingScreen";
import Camera from "./CameraTab";
import Wikipedia from "../Species/WikipediaView";

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

const verticalConfig = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
};

const Stack = createStackNavigator();

const linking = { prefixes: ["app://"] };

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
          component={Onboarding}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={verticalConfig}
        />
        <Stack.Screen
          name="Wikipedia"
          component={Wikipedia}
          options={verticalConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
