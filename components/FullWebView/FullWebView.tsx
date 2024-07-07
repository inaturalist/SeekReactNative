
import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import { viewStyles, textStyles } from "../../styles/fullWebView/fullWebView";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import createUserAgent from "../../utility/userAgent";

interface Props {
  // TODO: navigation TS
  navigation: any;
  headerText: string;
  uri: string;
  loggedIn?: boolean;
}

const FullWebView = ( { navigation, headerText, uri, loggedIn }: Props ) => {
  const navBack = () => navigation.goBack();
  const [token, setToken] = React.useState<
    string | {
      error: {
        type: "downtime" | "timeout" | "login";
        errorText?: string;
        numOfHours?: number;
      };
    } | undefined
  >();

  React.useEffect( ( ) => {
    let current = true;
    async function fetchData( ) {
      const login = await fetchAccessToken();
      const jwt = await fetchJSONWebToken( login );
      if ( !current ) {
        return;
      }
      setToken( jwt );
    }
    fetchData();
    return ( ) => {
      current = false;
    };
  }, [] );

  let source: {
    uri: string;
    headers?: {
      Authorization: string;
    };
  } = { uri };
  const renderWebview = ( ) => {
    if ( loggedIn ) {
      // undefined before fetching the token
      if ( !token ) {
        return null;
      }
      // token is an object if there was an error
      if ( token && typeof token === "object" ) {
        return <ErrorScreen error={token.error.type} number={token.error.numOfHours} />;
      }
    }
    return (
      <WebView startInLoadingState source={source} userAgent={createUserAgent()} />
    );
  };

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <StyledText style={[baseTextStyles.button, textStyles.text]}>{headerText}</StyledText>
        <TouchableOpacity onPress={navBack} style={viewStyles.back}>
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      {renderWebview()}
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default FullWebView;
