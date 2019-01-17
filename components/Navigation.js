import React from "react";
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import { Image } from "react-native";

import {
  colors,
  padding,
  fontSize,
  fonts
} from "../styles/global";
import icons from "../assets/icons";
import i18n from "../i18n";

import SplashScreen from "./SplashScreen";
import HomeScreen from "../containers/HomeContainer";
import Camera from "./Camera/Camera";
import Gallery from "./Camera/GalleryScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./Menu/YourCollection";
import BadgesScreen from "./Menu/BadgesScreen";
import AboutScreen from "./Menu/AboutScreen";
import AboutTitle from "./Menu/AboutTitle";
import BadgesTitle from "./Menu/BadgesTitle";
import SideMenu from "./Home/SideMenu";
import LoginScreen from "./Login/LoginScreen";
import AgeVerifyScreen from "./Login/AgeVerifyScreen";
import iNatLoginScreen from "./Login/iNatLoginScreen";
import CheckEmailScreen from "./Login/CheckEmailScreen";
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import WelcomeScreen from "./Login/WelcomeScreen";
import ParentalConsentScreen from "./Login/ParentalConsentScreen";
import SignUpScreen from "./Login/SignUpScreen-1";
import SignUpScreen2 from "./Login/SignUpScreen-2";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ParentCheckEmailScreen from "./Login/ParentCheckEmailScreen";
import PrivacyPolicyScreen from "./Login/PrivacyPolicyScreen";

const backButton = (
  <Image
    source={icons.backButton}
    style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}
  />
);

const greenHeader = {
  backgroundColor: colors.seekForestGreen,
  borderBottomWidth: 0
};

const whiteHeaderTitle = {
  fontSize: 22,
  color: colors.white,
  fontFamily: fonts.semibold,
  flex: 1,
  textAlign: "center"
};

const MenuDrawerNav = createDrawerNavigator( {
  Menu: {
    screen: SideMenu
  }
} );

const CameraNav = createBottomTabNavigator( {
  CAMERA: { screen: Camera },
  PHOTOS: { screen: Gallery }
}, {
  initialRouteName: "CAMERA",
  backBehavior: "none",
  tabBarOptions: {
    activeTintColor: colors.white,
    activeBackgroundColor: colors.darkGreen,
    inactiveTintColor: colors.lightGray,
    labelStyle: {
      color: colors.white,
      textAlign: "center",
      paddingTop: padding.small,
      paddingBottom: padding.large,
      fontFamily: fonts.semibold,
      fontSize: fontSize.text
    },
    indicatorStyle: {
      backgroundColor: colors.white
    },
    style: {
      backgroundColor: colors.black,
      height: 55
    }
  }
} );

const StackNavigatorConfig = {
  headerMode: "screen"
};

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Menu: {
    screen: MenuDrawerNav,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ( {
      title: i18n.t( "notifications.header" ),
      headerStyle: greenHeader,
      headerTitleStyle: whiteHeaderTitle,
      headerBackImage: backButton
    } )
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Age: {
    screen: AgeVerifyScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  iNatLogin: {
    screen: iNatLoginScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  Forgot: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  CheckEmail: {
    screen: CheckEmailScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  ParentCheckEmail: {
    screen: ParentCheckEmailScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Parent: {
    screen: ParentalConsentScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  Signup: {
    screen: SignUpScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  Signup2: {
    screen: SignUpScreen2,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerBackImage: backButton
    } )
  },
  Privacy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: () => ( {
      title: i18n.t( "privacy.header" ),
      headerStyle: greenHeader,
      headerTitleStyle: whiteHeaderTitle,
      headerBackImage: backButton
    } )
  },
  Main: {
    screen: HomeScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Camera: {
    screen: CameraNav,
    navigationOptions: ( { navigation } ) => ( {
      headerTransparent: navigation.state.index === 0,
      headerTintColor: navigation.state.index === 0 ? colors.white : null
    } )
  },
  Results: {
    screen: ChallengeResults,
    navigationOptions: () => ( {
      headerStyle: {
        backgroundColor: colors.darkestBlue
      },
      headerTintColor: colors.white
    } )
  },
  Species: {
    screen: SpeciesDetail,
    navigationOptions: ( { navigation } ) => ( {
      title: navigation.state.params.seen ? "Collected" : "Collect This!",
      headerStyle: {
        backgroundColor: navigation.state.params.seen ? colors.lightGray : colors.darkestBlue
      },
      headerTintColor: navigation.state.params.seen ? colors.black : colors.white
    } )
  },
  YourCollection: {
    screen: YourCollection,
    navigationOptions: ( { navigation } ) => ( {
      headerRight: <AboutTitle navigation={navigation} />
    } )
  },
  Badges: {
    screen: BadgesScreen,
    navigationOptions: ( { navigation } ) => ( {
      headerTitle: <BadgesTitle navigation={navigation} />
    } )
  },
  About: {
    screen: AboutScreen,
    navigationOptions: () => ( {
      title: i18n.t( "about.header" ),
      headerStyle: greenHeader,
      headerTitleStyle: whiteHeaderTitle,
      headerBackImage: backButton
    } )
  }
}, StackNavigatorConfig );

export default RootStack;
