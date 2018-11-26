import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import { colors, padding, fontSize } from "../styles/global";
import { setupBadges } from "../utility/helpers";

import SplashScreen from "./SplashScreen";
import WarningsScreen from "./WarningsScreen";
import MainScreen from "./MainScreen";
import Camera from "./Camera/Camera";
import Gallery from "./Camera/GalleryScreen";
import LocationPickerScreen from "./Challenges/LocationPickerScreen";
import TaxonPickerScreen from "./Challenges/TaxonPickerScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";
import BadgesScreen from "./BadgesScreen";
import AboutScreen from "./AboutScreen";
import AboutTitle from "./AboutTitle";
import BadgesTitle from "./BadgesTitle";

const CameraNav = createBottomTabNavigator( {
  CAMERA: { screen: Camera },
  PHOTOS: { screen: Gallery }
}, {
  initialRouteName: "CAMERA",
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.white,
    activeBackgroundColor: colors.darkGreen,
    inactiveTintColor: colors.lightGray,
    labelStyle: {
      color: colors.white,
      paddingBottom: padding.extraLarge,
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

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Warnings: {
    screen: WarningsScreen,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Camera: {
    screen: CameraNav,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Location: {
    screen: LocationPickerScreen,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Taxon: {
    screen: TaxonPickerScreen,
    navigationOptions: ( { navigation } ) => ( {
      header: null
    } )
  },
  Results: {
    screen: ChallengeResults,
    navigationOptions: ( { navigation } ) => ( {
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
    navigationOptions: ( { navigation } ) => ( {
      title: "About"
    } )
  }
} );

export default App = () => {
  setupBadges();
  return (
    <RootStack />
  );
};
