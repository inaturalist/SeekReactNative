// @flow

import React, { useCallback, useContext, useEffect } from "react";
import inatjs from "inaturalistjs";
import { View, Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { WebView } from "react-native-webview";
import makeWebshell, {
  HandleLinkPressFeature,
  HandleHTMLDimensionsFeature,
  ForceResponsiveViewportFeature,
  ForceElementSizeFeature,
  useAutoheight
} from "@formidable-webview/webshell";

import createUserAgent from "../../../utility/userAgent";
import { UserContext } from "../../UserContext";
import { viewStyles, textStyles } from "../../../styles/home/announcements";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import i18n from "../../../i18n";
import { fetchJSONWebToken } from "../../../utility/tokenHelpers";
import { fetchAccessToken } from "../../../utility/loginHelpers";
import { useNavigation } from "@react-navigation/native";

const Webshell = makeWebshell(
  WebView,
  new HandleLinkPressFeature( { preventDefault: true } ),
  new HandleHTMLDimensionsFeature(),
  new ForceResponsiveViewportFeature( { maxScale: 1 } ),
  new ForceElementSizeFeature( {
    target: "body",
    heightValue: "auto",
    widthValue: "auto"
  } )
);

const AutoheightWebView = ( webshellProps ): React.Node => {
  const { autoheightWebshellProps } = useAutoheight( {
    webshellProps
  } );
  return <Webshell {...autoheightWebshellProps} />;
};


const Announcements = ( ): React.Node => {
  const [announcements, setAnnouncements] = React.useState( undefined );

  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

  const navigation = useNavigation();

  const onLinkPress = ( target ) => {
    navigation.navigate( "FullAnnouncement", { uri: target.uri } );
  };

  const locale = i18n.currentLocale();

  const fetchAnnouncements = useCallback( async ( ) => {
    const params = {
      fields: "body,dismissible,start,end,placement",
      placement: "mobile",
      locale,
      per_page: 20
    };
    const accessToken = await fetchAccessToken();
    const apiToken = await fetchJSONWebToken( accessToken );
    const options = { api_token: apiToken, user_agent: createUserAgent() };
    inatjs.announcements
      .search( params, options )
      .then( ( { total_results, results } ) => {
        // TODO if total_results > results, paginate and get more
        // Array of { id, body, dismissible }
        const homeAnnouncements = results
          // Filter by placement on mobile home screen
          .filter( ( r ) => r.placement === "mobile/home" )
          // Sort by start date, oldest first
          .sort( ( a, b ) => new Date( a.start ) - new Date( b.start ) );
        setAnnouncements( homeAnnouncements );
      } )
      .catch( ( err ) => console.log( err, "err fetching announcements" ) );
  }, [locale] );

  const { userProfile } = useContext( UserContext );

  const { login } = userProfile || {
    login: null
  };

  useEffect( ( ) => {
    if ( !isConnected ) {
      return;
    }
    fetchAnnouncements();
  }, [isConnected, login, locale, fetchAnnouncements] );


  const showCard = isConnected && announcements && announcements.length > 0 && !!userProfile;
  if ( !showCard ) {
    return null;
  }

  const topAnnouncement = announcements[0];
  const { id, dismissible, body } = topAnnouncement;

  const dismiss = async ( ) => {
    const accessToken = await fetchAccessToken();
    const apiToken = await fetchJSONWebToken( accessToken );
    const options = { api_token: apiToken, user_agent: createUserAgent() };
    inatjs.announcements
      .dismiss( { id }, options )
      .then( ( ) => {
        // Optimistically remove the announcement from the list in state
        const newAnnouncements = announcements.filter( ( a ) => a.id !== id );
        setAnnouncements( newAnnouncements );

        // Refetch announcements
        fetchAnnouncements();
      } )
      .catch( ( err ) => console.log( err, "err dismissing announcement" ) );
  };

  return (
    <View style={viewStyles.whiteContainer} testID="announcements-container">
      <Text style={textStyles.header}>
        {i18n.t( "announcements.header" ).toLocaleUpperCase()}
      </Text>
      <AutoheightWebView
        onDOMLinkPress={onLinkPress}
        originWhitelist={["*"]}
        source={{ html: body }}
        scrollEnabled={false}
        testID="announcements-webview"
      />
      {dismissible && (
        <GreenButton text="announcements.dismiss" handlePress={dismiss} />
      )}
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default Announcements;
