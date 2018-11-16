import React from "react";
import { createStackNavigator } from "react-navigation";

import { setupBadges } from "../utility/helpers";
import SplashScreen from "./SplashScreen";
import WarningsScreen from "./WarningsScreen";
import MainScreen from "./MainScreen";
import Camera from "./Camera/Camera";
import LocationPickerScreen from "./Challenges/LocationPickerScreen";
import TaxonPickerScreen from "./Challenges/TaxonPickerScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";
import BadgesScreen from "./BadgesScreen";
import AboutScreen from "./AboutScreen";

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
    screen: Camera,
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
      header: null
    } )
  },
  Species: {
    screen: SpeciesDetail,
    navigationOptions: ( { navigation } ) => ( {
      title: "Collect This!"
    } )
  },
  YourCollection: {
    screen: YourCollection,
    navigationOptions: ( { navigation } ) => ( {
      title: "About"
    } )
  },
  Badges: {
    screen: BadgesScreen,
    navigationOptions: ( { navigation } ) => ( {
      title: `${navigation.state.params.badges} Earned!`
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
