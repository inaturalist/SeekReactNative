
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

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <StyledText style={[baseTextStyles.button, textStyles.text]}>{headerText}</StyledText>
        <TouchableOpacity onPress={navBack} style={viewStyles.back}>
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView startInLoadingState source={{ uri }} />
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default FullWebView;
