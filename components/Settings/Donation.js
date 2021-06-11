// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/wikipedia";
import icons from "../../assets/icons";
import urls from "../../constants/urls";

type Props = {
  +navigation: any
};

const Donation = ( { navigation }: Props ): React.Node => {
  const goBack = ( ) => navigation.goBack( );

  const donationPage = `${urls.DONORBOX}&utm_source=android`;

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <Text style={textStyles.text}>{i18n.t( "settings.donate" ).toLocaleUpperCase( )}</Text>
        <TouchableOpacity
          onPress={goBack}
          style={viewStyles.back}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <WebView
        startInLoadingState
        source={{ uri: donationPage }}
      />
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default Donation;
