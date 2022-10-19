// @flow

import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/wikipedia";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";

type Props = {
  +navigation: any,
  +route: any
};

const WikipediaView = ( { navigation, route }: Props ): React.Node => {
  const { wikiUrl, scientificName } = route.params;

  let uri;

  const wikiLocale = i18n.currentLocale().split( "-" )[0].toLowerCase();

  if ( wikiLocale === "en" ) {
    uri = wikiUrl;
  } else {
    uri = `http://${wikiLocale}.wikipedia.org/wiki/${scientificName}`;
  }

  const navBack = () => navigation.goBack();

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <StyledText style={textStyles.text}>{i18n.t( "species_detail.wikipedia_1" ).toLocaleUpperCase()}</StyledText>
        <TouchableOpacity onPress={navBack} style={viewStyles.back}>
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView startInLoadingState source={{ uri }} />
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default WikipediaView;
