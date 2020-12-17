// @flow

import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import styles from "../../styles/social/social";
import { dimensions } from "../../styles/global";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import i18n from "../../i18n";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import { shareToFacebook, saveToCameraRoll, addWatermark, getOriginalHeight } from "../../utility/socialHelpers";

const SocialScreen = ( ) => {
  const { params } = useRoute( );
  const { uri } = params;

  const [tab, setTab] = useState( "square" );
  const [imageForSocial, setImageForSocial] = useState( null );
  const [watermark, setWatermark] = useState( true );
  // const navigation = useNavigation( );

  const toggleTab = ( ) => {
    if ( tab === "square" ) {
      setTab( "original" );
    } else {
      setTab( "square" );
    }
  };

  const renderTab = selectedTab => (
    <TouchableOpacity onPress={toggleTab}>
      <Text style={[styles.photoSizeText, tab === selectedTab && styles.selectedPhotoSizeText]}>
        {i18n.t( `social.${selectedTab}` ).toLocaleUpperCase( )}
      </Text>
    </TouchableOpacity>
  );

  const renderIndicator = selectedTab => {
    if ( tab === selectedTab ) {
      return <View style={styles.roundedIndicator} />;
    } else {
      return <View style={styles.hiddenIndicator} />;
    }
  };

  const shareToSocial = ( ) => shareToFacebook( imageForSocial );

  const saveWatermarkedImage = ( ) => saveToCameraRoll( imageForSocial );

  // useEffect( ( ) => {
  //   if ( watermark ) {
  //     const watermarkedImage = addWatermark( image );
  //     setImageForSocial( watermarkedImage );
  //   }
  // }, [watermark, image] );

  return (
    <ScrollNoHeader>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="social.share_observation" />
        </View>
        <View />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.photoTabs}>
          {renderTab( "square" )}
          {renderTab( "original" )}
        </View>
        <View style={styles.photoTabs}>
          {renderIndicator( "square" )}
          {renderIndicator( "original" )}
        </View>
        {uri && <Image source={{ uri }} style={styles.image} />}
        {/* {clicked && (
          <View style={styles.loadingWheel}>
            <LoadingWheel color="white" />
          </View>
        )} */}

        <View style={styles.imageBackground} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.optionsText}>{i18n.t( "social.options" ).toLocaleUpperCase( )}</Text>
        <Text style={styles.speciesIdText}>{i18n.t( "social.show_species_id" )}</Text>
      </View>
      <View style={styles.spaceBeforeButtons} />
      <GreenButton
        width={dimensions.width}
        handlePress={shareToSocial}
        text="social.share"
      />
      <View style={styles.spaceBetweenButtons} />
      <GreenButton
        width={dimensions.width}
        handlePress={saveWatermarkedImage}
        text="social.save_to_camera_roll"
      />
      <View style={styles.spaceAfterButtons} />
      <Text style={styles.linkText}>{i18n.t( "social.back_to_id" )}</Text>
    </ScrollNoHeader>
  );
};

export default SocialScreen;
