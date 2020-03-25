import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators
} from "react-navigation-stack";

import CameraNav from "./CameraTab";
import { ChallengeFooterTabNav, FooterTabNav } from "./FooterTabs";

import OfflineARResults from "../Results/OfflineARResults";
import OnlineServerResults from "../Results/OnlineServerResults";
import Match from "../Results/MatchScreen";
import RangeMap from "../Species/RangeMap";
import NotificationsScreen from "../Notifications/Notifications";
import CameraHelpScreen from "../Camera/CameraHelpScreen";
import PostScreen from "../PostToiNat/PostScreen";
import PostingHelpScreen from "../PostToiNat/PostingHelpScreen";
import WikipediaView from "../Species/WikipediaView";

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

export default MainStack;
