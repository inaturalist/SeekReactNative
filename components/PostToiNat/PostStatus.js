import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/posting/postStatus";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";
import GreenText from "../UIComponents/GreenText";
import { setRoute } from "../../utility/helpers";

type Props = {
  +postingSuccess: boolean,
  +togglePostModal: Function,
  +status: string,
  +errorText: string
};

const PostStatus = ( {
  postingSuccess,
  togglePostModal,
  status,
  errorText
}: Props ) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState( true );

  useEffect( () => {
    if ( postingSuccess !== null ) {
      setLoading( false );
    }
  }, [postingSuccess] );

  let headerText;
  let image;
  let extraText;

  if ( loading ) {
    headerText = "posting.posting";
    image = <LoadingWheel color={colors.seekiNatGreen} />;
    extraText = i18n.t( "posting.wait" );
  } else if ( !loading && postingSuccess ) {
    headerText = "posting.posting_success";
    image = <Image source={posting.bird} />;
  } else if ( status === "duringPhotoUpload" ) {
    headerText = "posting.posting_failure";
    image = <Image source={icons.error} tintColor={colors.seekTeal} style={styles.fail} />;
    extraText = `${i18n.t( "posting.error_photo_upload" )} \n\n${errorText}`;
  } else if ( status === "beforePhotoAdded" ) {
    headerText = "posting.posting_failure";
    image = <Image source={icons.error} tintColor={colors.seekTeal} style={styles.fail} />;
    extraText = `${i18n.t( "posting.error_observation" )} \n\n${errorText}`;
  } else if ( status === "beforeObservation" ) {
    headerText = "posting.posting_failure";
    image = <Image source={icons.error} tintColor={colors.seekTeal} style={styles.fail} />;
    extraText = `${i18n.t( "posting.error_token" )} \n\n${errorText}`;
  }

  return (
    <>
      <SafeAreaView color={colors.white} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <GreenText
          center
          color={!loading && !postingSuccess ? colors.seekTeal : colors.seekiNatGreen}
          text={headerText}
        />
        <View style={styles.center}>
          <View style={styles.margin} />
          {image}
          {loading && <View style={styles.margin} />}
          <Text style={styles.text}>{extraText}</Text>
        </View>
      </View>
      {!loading && (
        <View style={styles.bottom}>
          <GreenButton
            color={!loading && !postingSuccess ? colors.seekTeal : null}
            handlePress={() => {
              if ( postingSuccess ) {
                setRoute( "PostStatus" );
                navigation.goBack();
              } else {
                togglePostModal();
              }
            }}
            text="posting.ok"
          />
        </View>
      )}
    </>
  );
};

export default PostStatus;
