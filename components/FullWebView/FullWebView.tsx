
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

interface Props {
  uri: string;
  navigation: any;
  headerText: string;
}

const FullWebView: React.Node<Props> = ( { uri, navigation, headerText } ) => {
  const navBack = () => navigation.goBack();

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <StyledText style={textStyles.text}>{headerText}</StyledText>
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
