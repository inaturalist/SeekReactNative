import makeWebshell, {
  ForceElementSizeFeature,
  ForceResponsiveViewportFeature,
  HandleHTMLDimensionsFeature,
  HandleLinkPressFeature,
  useAutoheight,
} from "@formidable-webview/webshell";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import inatjs from "inaturalistjs";
import React, { useCallback, useContext, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/home/announcements";
import { baseTextStyles } from "../../../styles/textStyles";
import { fetchAccessToken } from "../../../utility/loginHelpers";
import { fetchJSONWebToken } from "../../../utility/tokenHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import StyledText from "../../UIComponents/StyledText";
import { UserContext } from "../../UserContext";

const Webshell = makeWebshell(
  WebView,
  new HandleLinkPressFeature( { preventDefault: true } ),
  new HandleHTMLDimensionsFeature(),
  new ForceResponsiveViewportFeature( { maxScale: 1 } ),
  new ForceElementSizeFeature( {
    target: "body",
    heightValue: "auto",
    widthValue: "auto",
  } )
);

const AutoheightWebView = ( webshellProps: any ) => {
  const { autoheightWebshellProps } = useAutoheight( {
    webshellProps,
  } );
  return <Webshell {...autoheightWebshellProps} />;
};


const Announcements = ( ) => {
  const [announcements, setAnnouncements] = React.useState<any[] | undefined>( undefined );

  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

  const navigation = useNavigation();

  const onLinkPress = ( target: any ) => {
    navigation.navigate( "FullAnnouncement", { uri: target.uri } );
  };

  const locale = i18n.locale;

  const fetchAnnouncements = useCallback( async ( ) => {
    const params = {
      fields: "body,dismissible,start,end,placement",
      placement: "mobile",
      locale,
      per_page: 20,
    };
    const accessToken = await fetchAccessToken();
    const apiToken = await fetchJSONWebToken( accessToken );
    const options = { api_token: apiToken };
    inatjs.announcements
      .search( params, options )
      .then( ( { results } ) => {
        // TODO: .then also returns total_results; if > results, should we paginate and get more?
        // Array of { id, body, dismissible }
        const homeAnnouncements = results
          // Filter by placement on mobile home screen
          .filter( ( r ) => r.placement === "mobile/home" )
          // Sort by start date, oldest first
          .sort( ( a, b ) => new Date( a.start ) - new Date( b.start ) );
        setAnnouncements( homeAnnouncements );
      } )
      .catch( ( err ) => {
        // TODO: handle error
        console.log( err, "err fetching announcements" );
      } );
  }, [locale] );

  const { userProfile } = useContext( UserContext );

  const { login } = userProfile || {
    login: null,
  };

  useEffect( ( ) => {
    // If not online or not logged in, don't fetch announcements
    if ( !isConnected || !login ) {
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
    const options = { api_token: apiToken };
    inatjs.announcements
      .dismiss( { id }, options )
      .then( ( ) => {
        // Optimistically remove the announcement from the list in state
        const newAnnouncements = announcements.filter( ( a ) => a.id !== id );
        setAnnouncements( newAnnouncements );

        // Refetch announcements
        fetchAnnouncements();
      } )
      .catch( ( err ) => {
        // TODO: handle error
        console.log( err, "err dismissing announcement" );
      } );
  };

  return (
    <View style={viewStyles.whiteContainer} testID="announcements-container">
      <StyledText style={[baseTextStyles.header, textStyles.header]}>
        {i18n.t( "announcements.header" ).toLocaleUpperCase()}
      </StyledText>
      <AutoheightWebView
        onDOMLinkPress={onLinkPress}
        originWhitelist={["*"]}
        source={{ html: body }}
        scrollEnabled={false}
        testID="announcements-webview"
      />
      {dismissible && (
        <>
          <View style={viewStyles.marginGreenButtonLarge} />
          <GreenButton text="announcements.dismiss" handlePress={dismiss} />
        </>
      )}
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default Announcements;
