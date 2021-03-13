// @flow

import React from "react";
import { Text, Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../i18n";
import styles from "../../styles/posting/postModal";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import { useInternetStatus } from "../../utility/customHooks";

type Props = {
  closeModal: ( ) => void,
  uploadStatus: any
};

const PostModal = ( { closeModal, uploadStatus }: Props ) => {
  const internet = useInternetStatus( );

  const serverDowntime = typeof uploadStatus === "object" ? uploadStatus.error : null;

  const setHeaderText = ( ) => {
    if ( serverDowntime ) {
      return "posting_status.server_downtime";
    } else if ( internet ) {
      return "posting_status.posting_to_inat_background";
    } else 
    return "posting_status.no_internet";
  };

  const setText = ( ) => {
    if ( serverDowntime ) {
      return i18n.t( "posting_status.server_downtime_description", { count: serverDowntime } );
    } else if ( internet ) {
      return i18n.t( "posting_status.posting_to_inat_background_description" );
    } else 
    return i18n.t( "posting_status.no_internet_description" );
  };

  const setImage = ( ) => {
    if ( serverDowntime ) {
      return posting.postingServerDowntime;
    } else if ( internet ) {
      return posting.postingSuccess;
    }
    return posting.postingNoInternet
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {!internet && <Image source={posting.internet} />}
        <Text style={styles.headerText}>{i18n.t( setHeaderText( ) )}</Text>
        <Image style={styles.uploadImage} source={setImage( )} />
        <Text style={styles.text}>{setText( )}</Text>
      </View>
      <View style={styles.greenButton}>
        <GreenButton
          handlePress={closeModal}
          text="posting.ok"
        />
      </View>
    </SafeAreaView>
  );
};

export default PostModal;
