// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../i18n";
import styles from "../../styles/species/wikipedia";
import icons from "../../assets/icons";

type Props = {
  +navigation: any,
  +route: any
};

const WikipediaView = ( { navigation, route }: Props ) => {
  const { wikiUrl, scientificName } = route.params;

  let uri;

  const wikiLocale = i18n.currentLocale().split( "-" )[0].toLowerCase();

  if ( wikiLocale === "en" ) {
    uri = wikiUrl;
  } else {
    uri = `http://${wikiLocale}.wikipedia.org/wiki/${scientificName}`;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.text}>{i18n.t( "species_detail.wikipedia_1" ).toLocaleUpperCase()}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView startInLoadingState source={{ uri }} />
      <View style={styles.bottom} />
    </SafeAreaView>
  );
};

export default WikipediaView;
