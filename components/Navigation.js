import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { fadeIn, fromRight, fromBottom } from "react-navigation-transitions";

import styles from "../styles/navigation";
import i18n from "../i18n";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./Home/HomeScreen";
import ARCamera from "./Camera/ARCamera";
import Gallery from "./Camera/GalleryScreen";
import Results from "./Results/Results";
import SpeciesDetail from "./Species/SpeciesDetail";
import RangeMap from "./Species/RangeMap";
import MyObservations from "./Observations/MyObservations";
import AchievementsScreen from "./Achievements/AchievementsScreen";
import AboutScreen from "./AboutScreen";
import SideMenu from "./Home/SideMenu";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "./Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "./iNatStats";
import CameraHelpScreen from "./Camera/CameraHelpScreen";
import Footer from "./Home/Footer";
import ChallengeFooter from "./Challenges/ChallengeFooter";
import LoginOrSignupScreen from "./LoginOrSignupScreen";
import LoginScreen from "./Login/LoginScreen";
import LoginSuccessScreen from "./Login/LoginSuccessScreen";
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import PasswordEmailScreen from "./Login/PasswordEmailScreen";
import AgeVerifyScreen from "./Signup/AgeVerifyScreen";
import ParentalConsentScreen from "./Signup/ParentalConsentScreen";
import ParentCheckEmailScreen from "./Signup/ParentCheckEmailScreen";
import LicensePhotosScreen from "./Signup/LicensePhotosScreen";
import SignUpScreen from "./Signup/SignUpScreen";
import PrivacyPolicyScreen from "./Login/PrivacyPolicyScreen";
import PostScreen from "./PostToiNat/PostScreen";

const handleCustomTransition = ( { scenes } ) => {
  const nextScene = scenes[scenes.length - 1];

  if ( nextScene.route.routeName === "Notifications" ) {
    return fromRight();
  }
  if ( nextScene.route.routeName === "Camera" ) {
    return fromBottom( 100 );
  }
  return fadeIn();
};

const noHeader = {
  header: null
};

const CameraNavigatorConfig = {
  initialRouteName: "CAMERA",
  tabBarPosition: "bottom",
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: styles.cameraTabLabel,
    style: styles.cameraTab,
    indicatorStyle: styles.indicator
  }
};

const StackNavigatorConfig = {
  headerMode: "none",
  transitionConfig: () => fadeIn()
};

const DrawerNavigatorConfig = {
  contentComponent: SideMenu,
  headerMode: "none"
};

const FooterTabConfig = {
  tabBarComponent: Footer
};

const ChallengeFooterTabConfig = {
  tabBarComponent: ChallengeFooter
};

const CameraNav = createMaterialTopTabNavigator( {
  CAMERA: {
    screen: ARCamera,
    navigationOptions: () => ( {
      title: i18n.t( "camera.label" ).toLocaleUpperCase()
    } )
  },
  PHOTOS: {
    screen: Gallery,
    navigationOptions: () => ( {
      title: i18n.t( "gallery.label" ).toLocaleUpperCase()
    } )
  }
}, CameraNavigatorConfig );

const ChallengeFooterTabNav = createBottomTabNavigator( {
  Challenges: {
    screen: ChallengeScreen
  },
  ChallengeDetails: {
    screen: ChallengeDetailsScreen
  }
}, ChallengeFooterTabConfig );

const FooterTabNav = createBottomTabNavigator( {
  Main: {
    screen: HomeScreen
  },
  CameraHelp: {
    screen: CameraHelpScreen
  },
  Notifications: {
    screen: NotificationsScreen
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  Badges: {
    screen: AchievementsScreen
  },
  MyObservations: {
    screen: MyObservations
  },
  About: {
    screen: AboutScreen
  },
  Species: {
    screen: SpeciesDetail
  }
}, FooterTabConfig );

const MainStack = createStackNavigator( {
  Footer: {
    screen: FooterTabNav,
    navigationOptions: () => noHeader
  },
  ChallengeFooter: {
    screen: ChallengeFooterTabNav,
    navigationOptions: () => noHeader
  },
  Camera: {
    screen: CameraNav,
    navigationOptions: () => noHeader
  },
  Results: {
    screen: Results,
    navigationOptions: () => noHeader
  },
  RangeMap: {
    screen: RangeMap,
    navigationOptions: () => noHeader
  }
  // Post: {
  //   screen: PostScreen,
  //   navigationOptions: () => noHeader
  // }
}, {
  transitionConfig: nav => handleCustomTransition( nav )
} );

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  Challenges: {
    screen: ChallengeScreen
  },
  ChallengeDetails: {
    screen: ChallengeDetailsScreen
  },
  Badges: {
    screen: AchievementsScreen
  },
  MyObservations: {
    screen: MyObservations
  },
  About: {
    screen: AboutScreen
  }
}, DrawerNavigatorConfig );

const LoginStack = createStackNavigator( {
  LoginOrSignup: {
    screen: LoginOrSignupScreen,
    navigationOptions: () => noHeader
  },
  Age: {
    screen: AgeVerifyScreen,
    navigationOptions: () => noHeader
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => noHeader
  },
  Forgot: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => noHeader
  },
  PasswordEmail: {
    screen: PasswordEmailScreen,
    navigationOptions: () => noHeader
  },
  ParentCheckEmail: {
    screen: ParentCheckEmailScreen,
    navigationOptions: () => noHeader
  },
  LoginSuccess: {
    screen: LoginSuccessScreen,
    navigationOptions: () => noHeader
  },
  Parent: {
    screen: ParentalConsentScreen,
    navigationOptions: () => noHeader
  },
  LicensePhotos: {
    screen: LicensePhotosScreen,
    navigationOptions: () => noHeader
  },
  Signup: {
    screen: SignUpScreen,
    navigationOptions: () => noHeader
  },
  Privacy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: () => noHeader
  }
} );

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen
  },
  Onboarding: {
    screen: OnboardingScreen
  },
  Login: {
    screen: LoginStack
  },
  Main: {
    screen: MenuDrawerNav
  },
  Post: {
    screen: PostScreen,
    navigationOptions: () => noHeader
  }
}, StackNavigatorConfig );

const App = createAppContainer( RootStack );

export default App;
