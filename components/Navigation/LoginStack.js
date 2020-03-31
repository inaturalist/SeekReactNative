import { createStackNavigator } from "react-navigation-stack";

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

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultNavigation = {
  cardStyleInterpolator: forFade
};

const StackNavigatorConfig = {
  headerMode: "none",
  defaultNavigationOptions: defaultNavigation
};

const LoginStack = createStackNavigator( {
  LoginOrSignup: {
    screen: LoginOrSignupScreen
  },
  Age: {
    screen: AgeVerifyScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  Forgot: {
    screen: ForgotPasswordScreen
  },
  PasswordEmail: {
    screen: PasswordEmailScreen
  },
  ParentCheckEmail: {
    screen: ParentCheckEmailScreen
  },
  LoginSuccess: {
    screen: LoginSuccessScreen
  },
  Parent: {
    screen: ParentalConsentScreen
  },
  LicensePhotos: {
    screen: LicensePhotosScreen
  },
  Signup: {
    screen: SignUpScreen
  },
  Privacy: {
    screen: PrivacyPolicyScreen
  },
  TermsOfService: {
    screen: TermsOfServiceScreen
  }
}, StackNavigatorConfig );

export default LoginStack;
