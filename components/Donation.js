// @flow

import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../i18n";
import { viewStyles, textStyles } from "../styles/species/donation";
import icons from "../assets/icons";
import urls from "../constants/urls";
import CopyButton from "./UIComponents/Buttons/CopyButton";
import StyledText from "./UIComponents/StyledText";

type Props = {
  +navigation: any
};

const Donation = ( { navigation, route }: Props ): React.Node => {
  const goBack = ( ) => navigation.goBack( );

  const [selectedText, setSelectedText] = React.useState( false );

  const { params } = route;

  const standardCampaign = `${urls.DONORBOX}${urls.DONORBOX_STANDARD_CAMPAIGN}&utm_source=android`;
  const seekYearInReviewCampaign = `${urls.DONORBOX}&utm_campaign=${params?.utmCampaign}&utm_source=android`;
  const donationPage = params?.utmCampaign ? seekYearInReviewCampaign : standardCampaign;
  const redirectForiOS = "inaturalist.org/donate-seek";

  const highlightSelectedText = ( ) => setSelectedText( true );

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <StyledText style={textStyles.text}>{i18n.t( "settings.donate" ).toLocaleUpperCase( )}</StyledText>
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
          <StyledText style={[textStyles.text, textStyles.blackText]}>
           {i18n.t( "settings.donate_ios" )}
          </StyledText>
          <CopyButton stringToCopy={redirectForiOS} handleHighlight={highlightSelectedText}>
            <StyledText style={[
              textStyles.donateText,
              selectedText && viewStyles.selectedPressableArea
            ]}>
              {redirectForiOS}
            </StyledText>
          </CopyButton>
        </View>
      )}
      <View style={viewStyles.bottom} />
    </SafeAreaView>
  );
};

export default Donation;
