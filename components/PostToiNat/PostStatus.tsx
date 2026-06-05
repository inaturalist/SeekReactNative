import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import posting from "../../assets/posting";
import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/posting/postModal";
import { baseTextStyles } from "../../styles/textStyles";
import { useInternetStatus } from "../../utility/customHooks";
import type { RootStackScreenProps } from "../Navigation/types";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";

const PostStatus = ( ) => {
  const navigation = useNavigation<RootStackScreenProps<"PostStatus">["navigation"]>( );
  const internet = useInternetStatus( );

  const setHeaderText = ( ) => {
    if ( internet ) {
      return "posting_status.posting_to_inat_background";
    } else {
      return "posting_status.no_internet";
    }
  };

  const setText = ( ) => {
    if ( internet ) {
      return i18n.t( "posting_status.posting_to_inat_background_description" );
    } else {
      return i18n.t( "posting_status.no_internet_description" );
    }
  };

  const setImage = ( ) => {
    if ( internet ) {
      return posting.postingSuccess;
    } else {
      return posting.postingNoInternet;
    }
  };

  const navToMatch = ( ) => navigation.popTo( "Drawer", {
    screen: "Match",
  } );

  return (
    <SafeAreaView style={viewStyles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={viewStyles.content}>
        {!internet && <Image source={posting.internet} />}
        <StyledText style={[baseTextStyles.modalBannerGreen, textStyles.headerText]}>
          {i18n.t( setHeaderText() )}
        </StyledText>
        <Image source={setImage()} style={viewStyles.uploadImage} />
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{setText()}</StyledText>
      </View>
      <View style={viewStyles.greenButton}>
        <GreenButton handlePress={navToMatch} text="posting.ok" />
      </View>
    </SafeAreaView>
  );
};

export default PostStatus;
