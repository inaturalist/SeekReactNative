// @flow

import * as React from "react";
import { Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/posting/postModal";
import posting from "../../assets/posting";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { useInternetStatus } from "../../utility/customHooks";
import StyledText from "../UIComponents/StyledText";

const PostStatus = ( ): React.Node => {
  const navigation = useNavigation( );
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

  const navToMatch = ( ) => navigation.navigate( "Match" );

  return (
    <SafeAreaView style={viewStyles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={viewStyles.content}>
        {!internet && <Image source={posting.internet} />}
        <StyledText style={textStyles.headerText}>
          {i18n.t( setHeaderText() )}
        </StyledText>
        <Image source={setImage()} style={viewStyles.uploadImage} />
        <StyledText style={textStyles.text}>{setText()}</StyledText>
      </View>
      <View style={viewStyles.greenButton}>
        <GreenButton handlePress={navToMatch} text="posting.ok" />
      </View>
    </SafeAreaView>
  );
};

export default PostStatus;
