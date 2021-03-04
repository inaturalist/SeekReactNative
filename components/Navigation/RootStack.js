// @flow
import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../../styles/global";
import Drawer from "./SideDrawer";
import Splash from "../Splash";
import Onboarding from "../Onboarding/OnboardingScreen";
import Camera from "./CameraTab";
import Wikipedia from "../Species/WikipediaView";
import OnlineServerResults from "../Results/OnlineServerResults";
import CameraHelp from "../Camera/CameraHelpScreen";
import Post from "../PostToiNat/PostScreen2";
import PostingHelp from "../PostToiNat/PostingHelpScreen";
import RangeMap from "../Species/OnlineOnlyCards/RangeMap";
import Donation from "../Settings/Donation";
import PrivacyPolicyScreen from "../Auth/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../Auth/TermsOfServiceScreen";
import CommunityGuidelines from "../Auth/CommunityGuidelines";
import LoginOrSignupScreen from "../Auth/LoginOrSignupScreen";
import LoginScreen from "../Auth/Login/LoginScreen";
import LoginSuccessScreen from "../Auth/Login/LoginSuccessScreen";
import ForgotPasswordScreen from "../Auth/Login/ForgotPasswordScreen";
import PasswordEmailScreen from "../Auth/Login/PasswordEmailScreen";
import AgeVerifyScreen from "../Auth/Signup/AgeVerifyScreen";
import ParentalConsentScreen from "../Auth/Signup/ParentalConsentScreen";
import ParentCheckEmailScreen from "../Auth/Signup/ParentCheckEmailScreen";
import LicensePhotosScreen from "../Auth/Signup/LicensePhotosScreen";
import SignUpScreen from "../Auth/Signup/SignUpScreen";

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

const screenOptions = { gestureEnabled: false };

const Stack = createStackNavigator();

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={screenOptions}
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
        <Stack.Screen
          name="CommunityGuidelines"
          component={CommunityGuidelines}
          options={defaultConfig}
        />
        <Stack.Screen
          name="LoginOrSignup"
          component={LoginOrSignupScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Age"
          component={AgeVerifyScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="PasswordEmail"
          component={PasswordEmailScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="ParentCheck"
          component={ParentCheckEmailScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="LoginSuccess"
          component={LoginSuccessScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Parent"
          component={ParentalConsentScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="LicensePhotos"
          component={LicensePhotosScreen}
          options={defaultConfig}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={defaultConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
