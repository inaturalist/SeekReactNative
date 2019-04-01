import React, { Component } from "react";
import RNLanguages from "react-native-languages";

import i18n from "../i18n";
import RootStack from "./Navigation";
import { setupBadges } from "../utility/badgeHelpers";
import { setupChallenges } from "../utility/challengeHelpers";
// import { setupCommonNames } from "../utility/commonNamesHelpers";

class App extends Component {
  async componentWillMount() {
    await setupBadges();
    await setupChallenges();
    // do not wait for commonNames setup to complete. It could take a while to
    // add all names to Realm and we don't want to hold up the UI as names
    // are not needed immediately
    // setTimeout( setupCommonNames, 5000 );
    RNLanguages.addEventListener( "change", this.onLanguagesChange );
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener( "change", this.onLanguagesChange );
  }

  onLanguagesChange = ( { language } ) => {
    i18n.locale = language;
  };

  render() {
    return (
      <RootStack />
    );
  }
}

export default App;
