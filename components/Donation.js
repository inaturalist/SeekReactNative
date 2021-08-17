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
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../i18n";
import { viewStyles, textStyles } from "../styles/species/wikipedia";
import icons from "../assets/icons";
import urls from "../constants/urls";
import CopyButton from "./UIComponents/Buttons/CopyButton";

type Props = {
  +navigation: any
};

const Donation = ( { navigation }: Props ): React.Node => {
  const goBack = ( ) => navigation.goBack( );
  const [selectedText, setSelectedText] = React.useState( false );

  const donationPage = `${urls.DONORBOX}&utm_source=android`;
  const redirectForiOS = "inaturalist.org/donate-seek";

  const highlightSelectedText = ( ) => setSelectedText( true );

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
      {Platform.OS === "android" ? (
        <WebView
          startInLoadingState
          source={{ uri: donationPage }}
        />
      ) : (
        <View style={viewStyles.whiteContainer}>
          <Text style={[textStyles.text, textStyles.blackText]}>
           {i18n.t( "settings.donate_ios" )}
          </Text>
          <CopyButton stringToCopy={redirectForiOS} handleHighlight={highlightSelectedText}>
            <Text style={[
              textStyles.donateText,
              selectedText && viewStyles.selectedPressableArea
            ]}>
              {redirectForiOS}
            </Text>
          </CopyButton>
        </View>
      )}
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default Donation;
