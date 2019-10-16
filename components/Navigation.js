import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator, createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, Dimensions } from "react-native";
import { fadeIn, fromRight, fromBottom } from "react-navigation-transitions";

import styles from "../styles/navigation";
import i18n from "../i18n";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./Home/HomeScreen";
import ARCamera from "./Camera/ARCamera";
import Gallery from "./Camera/GalleryScreen";
import ARCameraResults from "./Results/ARCameraResults";
import GalleryResults from "./Results/GalleryResults";
import Match from "./Results/MatchScreen";
import SpeciesDetail from "./Species/SpeciesDetail";
import RangeMap from "./Species/RangeMap";
import Observations from "./Observations/Observations";
import AchievementsScreen from "./Achievements/AchievementsScreen";
import AboutScreen from "./AboutScreen";
import SideMenu from "./Home/SideMenu";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "./Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "./iNatStats";
import CameraHelpScreen from "./Camera/CameraHelpScreen";
import Footer from "./UIComponents/Footer";
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
import TermsOfServiceScreen from "./Login/TermsOfServiceScreen";
import PostScreen from "./PostToiNat/PostScreen";
import PostingHelpScreen from "./PostToiNat/PostingHelpScreen";
import WikipediaView from "./Species/WikipediaView";

const { width, height } = Dimensions.get( "window" );

const handleCustomTransition = ( { scenes } ) => {
  const nextScene = scenes[scenes.length - 1];
  const { route } = nextScene;

  if ( route ) {
    if ( route.routeName === "Notifications" ) {
      return fromRight( 200 );
    }
    if ( route.routeName === "Camera" ) {
      return fromBottom( 100 );
    }
  }

  return fadeIn();
};

const noHeader = {
  header: null
};

const CameraNavigatorConfig = {
  initialRouteName: "CAMERA",
  tabBarPosition: "bottom",
  swipeEnabled: Platform.OS === "ios",
  lazy: true, // see if this improves performance,
  initialLayout: { // prevents one frame delay
    width,
    height
  },
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

const FooterTabNav = createBottomTabNavigator( {
  Main: {
    screen: HomeScreen
  },
  Achievements: {
    screen: AchievementsScreen
  },
  Challenges: {
    screen: ChallengeScreen
  },
  ChallengeDetails: {
    screen: ChallengeDetailsScreen
  },
  MyObservations: {
    screen: Observations
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  About: {
    screen: AboutScreen
  },
  CameraHelp: {
    screen: CameraHelpScreen
  },
  Notifications: {
    screen: NotificationsScreen
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
  Camera: {
    screen: CameraNav,
    navigationOptions: () => noHeader
  },
  ARCameraResults: {
    screen: ARCameraResults,
    navigationOptions: () => noHeader
  },
  GalleryResults: {
    screen: GalleryResults,
    navigationOptions: () => noHeader
  },
  Match: {
    screen: Match,
    navigationOptions: () => noHeader
  },
  RangeMap: {
    screen: RangeMap,
    navigationOptions: () => noHeader
  },
  Post: {
    screen: PostScreen,
    navigationOptions: () => noHeader
  },
  PostingHelp: {
    screen: PostingHelpScreen,
    navigationOptions: () => noHeader
  },
  Wikipedia: {
    screen: WikipediaView,
    navigationOptions: () => noHeader
  }
}, {
  transitionConfig: nav => handleCustomTransition( nav )
} );

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack
  },
  // Achievements: {
  //   screen: AchievementsScreen
  // },
  // Challenges: {
  //   screen: ChallengeScreen
  // },
  // MyObservations: {
  //   screen: Observations
  // },
  // iNatStats: {
  //   screen: iNatStatsScreen
  // },
  // About: {
  //   screen: AboutScreen
  // }
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
  LoginScreen: {
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
  },
  TermsOfService: {
    screen: TermsOfServiceScreen,
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
  }
}, StackNavigatorConfig );

const App = createAppContainer( RootStack );

export default App;
