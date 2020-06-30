// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
import { useSafeArea } from "react-native-safe-area-context";

import i18n from "../../i18n";
import styles from "../../styles/species/wikipedia";
import icons from "../../assets/icons";

type Props = {
  +navigation: any,
  +route: any
};

const WikipediaView = ( { navigation, route }: Props ) => {
  const { wikiUrl } = route.params;
  const insets = useSafeArea();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.text}>{i18n.t( "species_detail.wikipedia_1" ).toLocaleUpperCase()}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView startInLoadingState source={{ uri: wikiUrl }} />
      <View style={styles.bottom} />
    </View>
  );
};

export default WikipediaView;
