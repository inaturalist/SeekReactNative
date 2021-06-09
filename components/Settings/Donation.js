// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/wikipedia";
import icons from "../../assets/icons";

type Props = {
  +navigation: any
};

const Donation = ( { navigation }: Props ): React.Node => {
  const goBack = ( ) => navigation.goBack( );

  const donorbox = "https://donorbox.org/support-seek-by-inaturalist?utm_campaign=settings&utm_medium=seek";

  const donationPage = Platform.OS === "android"
    ? `${donorbox}&utm_source=android`
    : `${donorbox}&utm_source=ios`;

  return (
    <View style={viewStyles.container}>
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
    </View>
  );
};

export default Donation;
