import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { colors } from "../../styles/global";
import MenuDrawerNav from "./SideMenu";
import LoginStack from "./LoginStack";
import SplashScreen from "../SplashScreen";
import OnboardingScreen from "../Onboarding/OnboardingScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white
  }
};

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultFade = {
  cardStyleInterpolator: forFade
};

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer theme={MyTheme}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        component={SplashScreen}
        options={{ headerShown: false, defaultFade }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false, defaultFade }}
      />
      <Stack.Screen
        name="Login"
        component={LoginStack}
        options={{ headerShown: false, defaultFade }}
      />
      <Stack.Screen
        name="Drawer"
        component={MenuDrawerNav}
        options={{ headerShown: false, defaultFade }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
