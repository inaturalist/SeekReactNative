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
import OfflineARResults from "../Results/OfflineARResults";
import OnlineServerResults from "../Results/OnlineServerResults";
import CameraHelp from "../Camera/CameraHelpScreen";
import Post from "../PostToiNat/PostScreen";
import PostingHelp from "../PostToiNat/PostingHelpScreen";
import RangeMap from "../Species/OnlineOnlyCards/RangeMap";
import Donation from "../Settings/Donation";
import PrivacyPolicyScreen from "../Login/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../Login/TermsOfServiceScreen";

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
        <Stack.Screen
          name="CameraHelp"
          component={CameraHelp}
          options={defaultConfig}
        />
        <Stack.Screen
          name="OfflineARResults"
          component={OfflineARResults}
          options={defaultConfig}
        />
        <Stack.Screen
          name="OnlineServerResults"
          component={OnlineServerResults}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={defaultConfig}
        />
        <Stack.Screen
          name="PostingHelp"
          component={PostingHelp}
          options={defaultConfig}
        />
        <Stack.Screen // turn range map into modal, since it only pops up from species screen
          name="RangeMap"
          component={RangeMap}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Donation"
          component={Donation}
          options={verticalConfig}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyPolicyScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfServiceScreen}
          options={defaultConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
