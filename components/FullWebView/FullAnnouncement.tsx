// @flow

import * as React from "react";

import i18n from "../../i18n";
import FullWebView from "../FullWebView/FullWebView";

type Props = {
  navigation: any,
  route: any
};

const FullAnnouncement = ( { navigation, route }: Props ): React.Node => {
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
