import * as React from "react";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import icons from "../assets/icons";
import urls from "../constants/urls";
import i18n from "../i18n";
import { textStyles, viewStyles } from "../styles/species/donation";
import { baseTextStyles } from "../styles/textStyles";
import CopyButton from "./UIComponents/Buttons/CopyButton";
import StyledText from "./UIComponents/StyledText";

const Donation = ( { navigation, route } ) => {
  const goBack = ( ) => navigation.goBack( );

  const [selectedText, setSelectedText] = React.useState( false );

  const { params } = route;

  const standardCampaign = `${urls.DONATE_BASE_URL}${urls.UTM_STANDARD_CAMPAIGN}&utm_source=android`;
  const seekYearInReviewCampaign = `${urls.DONATE_BASE_URL}&utm_campaign=${params?.utmCampaign}&utm_source=android`;
  const donationPage = params?.utmCampaign ? seekYearInReviewCampaign : standardCampaign;
  const redirectForiOS = "inaturalist.org/donate-seek";

  const highlightSelectedText = ( ) => setSelectedText( true );

  const edges = ["top"];
  if ( Platform.OS === "android" ) {
    edges.push( "bottom" );
  }
  
  return (
    <SafeAreaView style={viewStyles.container} edges={edges}>
      <View style={viewStyles.header}>
        <StyledText style={[baseTextStyles.button, textStyles.text]}>
          {i18n.t( "settings.donate" ).toLocaleUpperCase( )}
        </StyledText>
        <TouchableOpacity
          accessibilityRole="button"
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
          <StyledText style={[baseTextStyles.body, textStyles.blackText]}>
           {i18n.t( "settings.donate_ios" )}
          </StyledText>
          <CopyButton stringToCopy={redirectForiOS} handleHighlight={highlightSelectedText}>
            <StyledText style={[
              baseTextStyles.donationLink,
              textStyles.donateText,
              selectedText && viewStyles.selectedPressableArea,
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
