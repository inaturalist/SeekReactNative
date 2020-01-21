import React, { Component } from "react";
import * as RNLocalize from "react-native-localize";
import Geolocation from "@react-native-community/geolocation";

import i18n from "../i18n";
import RootStack from "./Navigation";
import { setupBadges } from "../utility/badgeHelpers";
import { setupChallenges } from "../utility/challengeHelpers";
import { setupCommonNames } from "../utility/commonNamesHelpers";
import { fetchiNatStats } from "../utility/iNatStatsHelpers";
import { addARCameraFiles } from "../utility/helpers";

if ( process.env.NODE_ENV !== "production" ) {
  const whyDidYouRender = require( "@welldone-software/why-did-you-render" );
  whyDidYouRender( React, {
    collapseGroups: true
    // include: [/.*/]
  } );
}

class App extends Component {
  componentDidMount() {
    // don't block splash screen with setup
    setTimeout( setupBadges, 3000 );
    setTimeout( setupChallenges, 3000 );
    setTimeout( fetchiNatStats, 3000 );
    setTimeout( addARCameraFiles, 3000 );

    // do not wait for commonNames setup to complete. It could take a while to
    // add all names to Realm and we don't want to hold up the UI as names
    // are not needed immediately
    if ( global && global.location && global.location.pathname ) {
      if ( !global.location.pathname.includes( "debugger-ui" ) ) {
        // detect whether Chrome Debugger is open -- it can't run with so many Realm requests
        setTimeout( setupCommonNames, 5000 );
      }
    } else {
      setTimeout( setupCommonNames, 5000 );
    }

    Geolocation.setRNConfiguration( { authorizationLevel: "whenInUse" } );
    RNLocalize.addEventListener( "change", this.handleLocalizationChange );
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener( "change", this.handleLocalizationChange );
  }

  handleLocalizationChange = () => {
    const fallback = { languageTag: "en" };
    const { languageTag } = RNLocalize.getLocales()[0] || fallback;

    i18n.locale = languageTag;
  };

  render() {
    return (
      <RootStack />
    );
  }
}

export default App;
