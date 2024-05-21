import * as React from "react";

import i18n from "../../i18n";
import FullWebView from "../FullWebView/FullWebView";

interface Props {
  // TODO: navigation TS
  navigation: any;
  // TODO: navigation TS
  route: any;
}

const WikipediaView = ( { navigation, route }: Props ) => {
  const { wikiUrl, scientificName } = route.params;

  let uri;

  const wikiLocale = i18n.locale.split( "-" )[0].toLowerCase();

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
