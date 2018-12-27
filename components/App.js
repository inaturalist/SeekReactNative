import React, { Component } from "react";
import RNLanguages from "react-native-languages";

import i18n from "../i18n";
import RootStack from "./Navigation";
import { setupBadges } from "../utility/helpers";


class App extends Component {
  componentWillMount() {
    setupBadges();
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
