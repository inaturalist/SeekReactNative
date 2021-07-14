// @flow

import * as React from "react";
import { Text, Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/posting/postModal";
import posting from "../../assets/posting";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { useInternetStatus } from "../../utility/customHooks";

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
        <Text style={textStyles.headerText}>{i18n.t( setHeaderText( ) )}</Text>
        <Image style={viewStyles.uploadImage} source={setImage( )} />
        <Text style={textStyles.text}>{setText( )}</Text>
      </View>
      <View style={viewStyles.greenButton}>
        <GreenButton
          handlePress={navToMatch}
          text="posting.ok"
        />
      </View>
    </SafeAreaView>
  );
};

export default PostStatus;
