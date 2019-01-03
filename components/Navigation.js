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
import LocationPickerScreen from "./Challenges/LocationPickerScreen";
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
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import ParentalConsentScreen from "./Login/ParentalConsentScreen";
import SignUpScreen from "./Login/SignUpScreen";

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
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Age: {
    screen: AgeVerifyScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  iNatLogin: {
    screen: iNatLoginScreen
  },
  Forgot: {
    screen: ForgotPasswordScreen
  },
  Parent: {
    screen: ParentalConsentScreen
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
  Camera: {
    screen: CameraTabNav,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Location: {
    screen: LocationPickerScreen,
    navigationOptions: () => ( {
      header: null,
      gesturesEnabled: false
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
