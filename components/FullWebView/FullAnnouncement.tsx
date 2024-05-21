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
  const { uri } = route.params;

  return (
    <FullWebView
      uri={uri}
      navigation={navigation}
      headerText={i18n.t( "announcements.announcement" ).toLocaleUpperCase()}
    />
  );
};

export default FullAnnouncement;
