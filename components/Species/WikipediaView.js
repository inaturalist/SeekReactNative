// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";

import SafeAreaView from "../UIComponents/SafeAreaView";
import i18n from "../../i18n";
import styles from "../../styles/species/wikipedia";
import icons from "../../assets/icons";

type Props = {
  +navigation: any
};

const WikipediaView = ( { navigation }: Props ) => {
  const { wikiUrl } = navigation.state.params;

  return (
    <>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.text}>{i18n.t( "species_detail.wikipedia_1" ).toLocaleUpperCase()}</Text>
        <TouchableOpacity
          hitSlop={styles.touchable}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: wikiUrl }}
      />
      <View style={styles.bottom} />
    </>
  );
};

export default WikipediaView;
