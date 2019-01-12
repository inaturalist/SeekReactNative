import React from "react";
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";

import {
  colors,
  padding,
  fontSize,
  fonts
} from "../styles/global";

import SplashScreen from "./SplashScreen";
import HomeScreen from "../containers/HomeContainer";
import Camera from "./Camera/Camera";
import Gallery from "./Camera/GalleryScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";
import BadgesScreen from "./BadgesScreen";
import AboutScreen from "./AboutScreen";
import AboutTitle from "./AboutTitle";
import BadgesTitle from "./BadgesTitle";
import SideMenu from "./Home/SideMenu";
import LoginScreen from "./Login/LoginScreen";
import AgeVerifyScreen from "./Login/AgeVerifyScreen";
import iNatLoginScreen from "./Login/iNatLoginScreen";
import CheckEmailScreen from "./Login/CheckEmailScreen";
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import ParentalConsentScreen from "./Login/ParentalConsentScreen";
import SignUpScreen from "./Login/SignUpScreen";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Home/Notifications";

const MenuDrawerNav = createDrawerNavigator( {
  Menu: {
    screen: SideMenu
  }
} );

const CameraTabNav = createBottomTabNavigator( {
  CAMERA: { screen: Camera },
  PHOTOS: { screen: Gallery }
}, {
  initialRouteName: "CAMERA",
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
      header: null
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
      headerTintColor: colors.white
    } )
  },
  iNatLogin: {
    screen: iNatLoginScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerTintColor: colors.white
    } )
  },
  Forgot: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerTintColor: colors.white
    } )
  },
  CheckEmail: {
    screen: CheckEmailScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Parent: {
    screen: ParentalConsentScreen,
    navigationOptions: () => ( {
      headerTransparent: true,
      headerTintColor: colors.white
    } )
  },
  Signup: {
    screen: SignUpScreen
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
    screen: CameraTabNav,
    navigationOptions: () => ( {
      header: null
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
      title: "About"
    } )
  }
}, StackNavigatorConfig );

export default RootStack;
