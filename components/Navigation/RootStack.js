// @flow
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Drawer from "./SideDrawer";
import Splash from "../Splash";
import Onboarding from "../Onboarding/OnboardingScreen";
import Camera from "./CameraTab";
import Wikipedia from "../Species/WikipediaView";
import ConfirmScreen from "../Camera/Gallery/ConfirmScreen";
import CameraHelp from "../Camera/CameraHelpScreen";
import Post from "../PostToiNat/PostScreen";
import PostStatus from "../PostToiNat/PostStatus";
import PostingHelp from "../PostToiNat/PostingHelpScreen";
import RangeMap from "../Species/OnlineOnlyCards/RangeMap";
import Donation from "../Donation";
import FullAnnouncement from "../FullWebView/FullAnnouncement";
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
import Notifications from "../Notifications/Notifications";
import Social from "../Social/SocialScreen";

type Props = {
  +props: any,
  +ref: any,
  +type: any,
  +key: any
};

const forFade = ( { current } ) => ( { cardStyle: { opacity: current.progress } } );

const config = { headerShown: false };

const defaultConfig = { ...config, cardStyleInterpolator: forFade };
const verticalConfig = { ...config, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS };
const notificationsConfig = { ...config, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS };
// animation is off for resetting screen from AR Camera
const drawerConfig = { ...config,  animationEnabled: false };

const screenOptions = { gestureEnabled: false };
const modal = { presentation: "modal" };

const Stack = createStackNavigator( );

const App = ( ): Props => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Group screenOptions={screenOptions}>
            <Stack.Screen name="Splash" component={Splash} options={defaultConfig} />
            <Stack.Screen name="Onboarding" component={Onboarding} options={defaultConfig} />
            <Stack.Screen name="Camera" component={Camera} options={verticalConfig} />
            <Stack.Screen name="Drawer" component={Drawer} options={drawerConfig} />
            <Stack.Screen name="Confirm" component={ConfirmScreen} options={defaultConfig} />
            <Stack.Screen name="Post" component={Post} options={defaultConfig} />
            <Stack.Screen name="PostStatus" component={PostStatus} options={defaultConfig} />
            <Stack.Screen name="LoginOrSignup" component={LoginOrSignupScreen} options={defaultConfig} />
            <Stack.Screen name="Age" component={AgeVerifyScreen} options={defaultConfig} />
            <Stack.Screen name="Login" component={LoginScreen} options={defaultConfig} />
            <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={defaultConfig} />
            <Stack.Screen name="PasswordEmail" component={PasswordEmailScreen} options={defaultConfig} />
            <Stack.Screen name="ParentCheck" component={ParentCheckEmailScreen} options={defaultConfig} />
            <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} options={defaultConfig} />
            <Stack.Screen name="Parent" component={ParentalConsentScreen} options={defaultConfig} />
            <Stack.Screen name="LicensePhotos" component={LicensePhotosScreen} options={defaultConfig} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={defaultConfig} />
            <Stack.Screen name="Social" component={Social} options={defaultConfig} />
        </Stack.Group>
         <Stack.Group screenOptions={modal}>
            {/* Removed Footer from Notification screen because animation from right
            doesn't work if it's in drawer, but this screen would also need access to open the drawer
            if the footer is shown */}
            <Stack.Screen name="Notifications" component={Notifications} options={notificationsConfig} />
            <Stack.Screen name="RangeMap" component={RangeMap} options={defaultConfig} />
            <Stack.Screen name="Wikipedia" component={Wikipedia} options={verticalConfig} />
            <Stack.Screen name="CameraHelp" component={CameraHelp} options={defaultConfig} />
            <Stack.Screen name="Donation" component={Donation} options={verticalConfig} />
            <Stack.Screen name="PostingHelp" component={PostingHelp} options={defaultConfig} />
            <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} options={defaultConfig} />
            <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={defaultConfig} />
            <Stack.Screen
              name="CommunityGuidelines"
              component={CommunityGuidelines}
              options={defaultConfig}
            />
            <Stack.Screen
              name="FullAnnouncement"
              component={FullAnnouncement}
              options={verticalConfig}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
