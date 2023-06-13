// @flow

import * as React from "react";
import HTML from "react-native-render-html";
import inatjs from "inaturalistjs";
import { View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import createUserAgent from "../../../utility/userAgent";
import { UserContext } from "../../UserContext";
import { viewStyles } from "../../../styles/home/announcements";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import i18n from "../../../i18n";
import { createJwtToken } from "../../../utility/helpers";
const Announcements = ( ): React.Node => {
  const [announcements, setAnnouncements] = React.useState( undefined );

  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

  React.useEffect( ( ) => {
    if ( !isConnected ) {
      return;
    }

    const params = {
      fields: "body,dismissible,start,end,placement",
      placement: "mobile",
      locale: i18n.locale,
      per_page: 20
    };
    const options = { user_agent: createUserAgent() };
    inatjs.announcements
      .search( params, options )
      .then( ( { total_results, results } ) => {
        console.log( "results :>> ", results );
        // TODO if total_results > results, paginate and get more
        console.log( "total_results :>> ", total_results );
        // Array of { id, body, dismissible }
        const homeAnnouncements = results
          // Filter by placement on mobile home screen
          .filter( ( r ) => r.placement === "mobile/home" )
          // Sort by start date, oldest first
          .sort( ( a, b ) => new Date( a.start ) - new Date( b.start ) );
        setAnnouncements( homeAnnouncements );
      } )
      .catch( ( err ) => console.log( err, "err fetching announcements" ) );
  }, [isConnected] );

  const { userProfile } = React.useContext( UserContext );

  const showCard = isConnected && announcements && announcements.length > 0 && userProfile;
  console.log( "announcements :>> ", announcements );

  if ( !showCard ) {
    return null;
  }

  const topAnnouncement = announcements[0];
  const { id, dismissible, body } = topAnnouncement;

  const dismiss = ( ) => {
  };

  return (
    <View style={viewStyles.whiteContainer}>
      <HTML ignoredStyles={["font-family"]} source={{ html: body }} />
      {dismissible && <GreenButton text="announcements.close" handlePress={dismiss} />}
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default Announcements;
