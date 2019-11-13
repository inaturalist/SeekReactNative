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
import SideMenu from "./UIComponents/SideMenu";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "./Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "./iNatStats";
import CameraHelpScreen from "./Camera/CameraHelpScreen";
import Footer from "./UIComponents/Footer";
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
    if ( route.routeName === "Wikipedia" ) {
      return fromBottom( 100 );
    }
  }

  return fadeIn();
};

const CameraNavigatorConfig = {
  initialRouteName: "CAMERA",
  tabBarPosition: "bottom",
  swipeEnabled: Platform.OS === "ios",
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
  Achievements: {
    screen: AchievementsScreen
  },
  MyObservations: {
    screen: Observations
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
    screen: FooterTabNav
  },
  ChallengeFooter: {
    screen: ChallengeFooterTabNav
  },
  Camera: {
    screen: CameraNav
  },
  ARCameraResults: {
    screen: ARCameraResults
  },
  GalleryResults: {
    screen: GalleryResults
  },
  Match: {
    screen: Match
  },
  RangeMap: {
    screen: RangeMap
  },
  Post: {
    screen: PostScreen
  },
  PostingHelp: {
    screen: PostingHelpScreen
  },
  Wikipedia: {
    screen: WikipediaView
  }
}, {
  headerMode: "none",
  transitionConfig: nav => handleCustomTransition( nav )
} );

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack
  },
  Achievements: {
    screen: AchievementsScreen
  },
  Challenges: {
    screen: ChallengeScreen
  },
  MyObservations: {
    screen: Observations
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  About: {
    screen: AboutScreen
  }
}, DrawerNavigatorConfig );

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
}, { headerMode: "none" } );

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
}, {
  headerMode: "none",
  transitionConfig: () => fadeIn()
} );

const App = createAppContainer( RootStack );

export default App;
