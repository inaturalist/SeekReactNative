// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { getSystemName } from "react-native-device-info";
import { WebView } from "react-native-webview";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/wikipedia";
import icons from "../../assets/icons";

type Props = {
  +navigation: any
};

const Donation = ( { navigation }: Props ): React.Node => (
  <View style={viewStyles.container}>
    <View style={viewStyles.header}>
      <Text style={textStyles.text}>{i18n.t( "settings.donate" ).toLocaleUpperCase()}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={viewStyles.back}
      >
        <Image source={icons.closeWhite} />
      </TouchableOpacity>
    </View>
    <WebView
      startInLoadingState
      source={{ uri: `https://www.inaturalist.org/donate?utm_source=Seek_${getSystemName()}}` }}
    />
    <View style={viewStyles.bottom} />
  </View>
);

export default Donation;
