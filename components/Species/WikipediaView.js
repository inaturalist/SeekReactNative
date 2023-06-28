// @flow

import * as React from "react";

import i18n from "../../i18n";
import FullWebView from "../FullWebView/FullWebView";

type Props = {
  +navigation: any,
  +route: any
};

const WikipediaView = ( { navigation, route }: Props ): React.Node => {
  const { wikiUrl, scientificName } = route.params;

  let uri;

  const wikiLocale = i18n.currentLocale().split( "-" )[0].toLowerCase();

  if ( wikiLocale === "en" ) {
    uri = wikiUrl;
  } else {
    uri = `http://${wikiLocale}.wikipedia.org/wiki/${scientificName}`;
  }

  return (
    <FullWebView
      uri={uri}
      navigation={navigation}
      headerText={i18n.t( "species_detail.wikipedia_1" ).toLocaleUpperCase()}
    />
  );
};

export default WikipediaView;
