import * as React from "react";

import i18n from "../../i18n";
import FullWebView from "../FullWebView/FullWebView";

type Props = {
  // TODO: navigation TS
  navigation: any,
  // TODO: navigation TS
  route: any
};

const FullAnnouncement = ( { navigation, route }: Props ) => {
  const { uri, loggedIn } = route.params;

  return (
    <FullWebView
      navigation={navigation}
      headerText={!loggedIn ?
        i18n.t( "announcements.announcement" ).toLocaleUpperCase()
        : i18n.t( "settings.danger_zone" ).toLocaleUpperCase()
      }
      uri={uri}
      loggedIn={loggedIn}
    />
  );
};

export default FullAnnouncement;
