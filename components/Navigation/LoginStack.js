import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginOrSignupScreen from "../LoginOrSignupScreen";
import LoginScreen from "../Login/LoginScreen";
import LoginSuccessScreen from "../Login/LoginSuccessScreen";
import ForgotPasswordScreen from "../Login/ForgotPasswordScreen";
import PasswordEmailScreen from "../Login/PasswordEmailScreen";
import AgeVerifyScreen from "../Signup/AgeVerifyScreen";
import ParentalConsentScreen from "../Signup/ParentalConsentScreen";
import ParentCheckEmailScreen from "../Signup/ParentCheckEmailScreen";
import LicensePhotosScreen from "../Signup/LicensePhotosScreen";
import SignUpScreen from "../Signup/SignUpScreen";
import PrivacyPolicyScreen from "../Login/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../Login/TermsOfServiceScreen";

const Stack = createStackNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultConfig = {
  headerShown: false,
  cardStyleInterpolator: forFade
};

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="LoginOrSignup"
    screenOptions={{ gestureEnabled: false }}
  >
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
);

export default LoginStack;
