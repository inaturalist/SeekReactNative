// @flow

import React from "react";
import { Text, Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../i18n";
import styles from "../../styles/posting/postModal";
import { colors } from "../../styles/global";
// import posting from "../../assets/posting";
// import icons from "../../assets/icons";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import { useInternetStatus } from "../../utility/customHooks";
// import { setRoute } from "../../utility/helpers";

type Props = {
  closeModal: ( ) => void
};

const PostModal = ( { closeModal }: Props ) => {
  const internet = useInternetStatus( );

  const setHeaderText = ( ) => {
    if ( internet ) {
      return "posting_status.posting_to_inat_background";
    }
    return "posting_status.no_internet";
  };

  const setText = ( ) => {
    if ( internet ) {
      return i18n.t( "posting_status.posting_to_inat_background_description" );
    }
    return i18n.t( "posting_status.no_internet" );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <GreenText
          center
          color={colors.seekiNatGreen}
          text={setHeaderText( )}
        />
        {/* <Image source={tbd} />*/}
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
