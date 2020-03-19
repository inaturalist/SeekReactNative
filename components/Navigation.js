import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators
} from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator, createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, Dimensions } from "react-native";

import styles from "../styles/navigation";
import i18n from "../i18n";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./Home/HomeScreen";
import ARCamera from "./Camera/ARCamera";
import Gallery from "./Camera/Gallery/GalleryScreenHooks";
import OfflineARResults from "./Results/OfflineARResults";
import OnlineServerResults from "./Results/OnlineServerResults";
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
import DebugAndroid from "./UIComponents/DebugAndroid";
import SettingsScreen from "./Settings";

const { width, height } = Dimensions.get( "window" );

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultNavigation = {
  cardStyleInterpolator: forFade
};

const CameraNavigatorConfig = {
  initialRouteName: "CAMERA",
  tabBarPosition: "bottom",
  swipeEnabled: Platform.OS === "ios",
  animationEnabled: false,
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
  defaultNavigationOptions: defaultNavigation
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

const FooterTabNav = createBottomTabNavigator( { // these are screens that need access to the footer
  Main: {
    screen: HomeScreen
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
  },
  DebugAndroid: {
    screen: DebugAndroid
  },
  Settings: {
    screen: SettingsScreen
  }
}, FooterTabConfig );

const MainStack = createStackNavigator( {
  Footer: {
    screen: FooterTabNav
  },
  ChallengeFooter: {
    screen: ChallengeFooterTabNav,
    navigationOptions: () => ( {
      cardStyleInterpolator: forFade
    } )
  },
  Notifications: { // moved out of FooterTabNav to add animation
    screen: NotificationsScreen,
    navigationOptions: TransitionPresets.SlideFromRightIOS
  },
  CameraHelp: { // moved out of FooterTabNav to see if this helps with stutter
    screen: CameraHelpScreen
  },
  Camera: {
    screen: CameraNav,
    navigationOptions: {
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS // slide in from bottom
    }
  },
  OfflineARResults: {
    screen: OfflineARResults
  },
  OnlineServerResults: {
    screen: OnlineServerResults
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
    screen: WikipediaView,
    navigationOptions: {
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS // slide in from bottom
    }
  }
}, StackNavigatorConfig );

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
  },
  Settings: {
    screen: SettingsScreen
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
}, StackNavigatorConfig );

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
