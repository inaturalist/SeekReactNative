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

const defaultFade = {
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
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Age"
      component={AgeVerifyScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Forgot"
      component={ForgotPasswordScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="PasswordEmail"
      component={PasswordEmailScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="ParentCheck"
      component={ParentCheckEmailScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="LoginSuccess"
      component={LoginSuccessScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Parent"
      component={ParentalConsentScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="LicensePhotos"
      component={LicensePhotosScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Signup"
      component={SignUpScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Privacy"
      component={PrivacyPolicyScreen}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="TermsOfService"
      component={TermsOfServiceScreen}
      options={{ headerShown: false, defaultFade }}
    />
  </Stack.Navigator>
);

export default LoginStack;
