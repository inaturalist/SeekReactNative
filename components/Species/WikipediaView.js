// @flow

import React from "react";
import { WebView } from "react-native-webview";

import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import i18n from "../../i18n";

type Props = {
  +navigation: any
};

const WikipediaView = ( { navigation }: Props ) => {
  const { wikiUrl } = navigation.state.params;

  return (
    <>
      <SafeAreaView />
      <GreenHeader header={i18n.t( "species_detail.wikipedia_1" )} navigation={navigation} />
      <WebView
        source={{ uri: wikiUrl }}
      />
    </>
  );
};

export default WikipediaView;
