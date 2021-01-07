// @flow

import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Checkbox from "react-native-check-box";

import { colors } from "../../styles/global";
import styles from "../../styles/social/social";
import { dimensions } from "../../styles/global";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import i18n from "../../i18n";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import { shareToFacebook, saveToCameraRoll, addWatermark } from "../../utility/socialHelpers";
import { resizeImage } from "../../utility/photoHelpers";
import SquareImageCropper from "./SquareImageCropper";

const SocialScreen = ( ) => {
  const navigation = useNavigation( );
  const { params } = useRoute( );
  const { uri, taxon } = params;

  const [tab, setTab] = useState( "square" );
  const [imageForSocial, setImageForSocial] = useState( null );
  const [showWatermark, setShowWatermark] = useState( true );
  const [saved, setSaved] = useState( false );

  const toggleTab = ( ) => {
    if ( tab === "square" ) {
      setTab( "original" );
    } else {
      setTab( "square" );
    }
  };

  const toggleWatermark = ( ) => setShowWatermark( !showWatermark );

  const navigateBack = ( ) => navigation.goBack( );

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

  const saveWatermarkedImage = async ( ) => {
    const completedSave = await saveToCameraRoll( imageForSocial );
    if ( completedSave ) {
      setSaved( true );
    }
  };

  useEffect( ( ) => {
    const { taxaName, scientificName } = taxon;

    let commonName = scientificName.toLocaleUpperCase( );

    if ( taxaName ) {
      commonName = taxaName.toLocaleUpperCase( );
    }

    const createWatermark = async ( ) => {
      const resizedUri = await resizeImage( uri, 2048 );
      const watermarkedImage = await addWatermark( resizedUri, commonName, scientificName );
      setImageForSocial( watermarkedImage );
    };

    if ( showWatermark ) {
      createWatermark( );
    }
  }, [showWatermark, uri, taxon] );

  const setSaveToCameraText = ( ) => {
    let text = "social.save_to_camera_roll";
    if ( saved ) {
      text = "social.saved_to_camera_roll";
    }
    return text;
  };

  const cameraRollText = setSaveToCameraText( );

  const showOriginalRatioImage = ( ) => {
    if ( imageForSocial && showWatermark ) {
      return <Image source={{ uri: imageForSocial }} style={styles.image} />;
    }
    return <Image source={{ uri }} style={styles.image} />;
  };

  return (
    <ScrollNoHeader>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="social.share_observation" />
        </View>
        <View />
      </View>
      <View style={styles.photoTabs}>
        {renderTab( "square" )}
        {renderTab( "original" )}
      </View>
      <View style={styles.photoTabs}>
        {renderIndicator( "square" )}
        {renderIndicator( "original" )}
      </View>
      {tab === "square"
        ? <SquareImageCropper uri={uri} showWatermark={showWatermark} />
        : showOriginalRatioImage( )}
      <View style={styles.textContainer}>
        <Text style={styles.optionsText}>{i18n.t( "social.options" ).toLocaleUpperCase( )}</Text>
        <View style={styles.row}>
          <Checkbox
            checkBoxColor={colors.checkboxColor}
            isChecked={showWatermark}
            onClick={toggleWatermark}
          />
          <Text style={styles.speciesIdText}>{i18n.t( "social.show_species_id" )}</Text>
        </View>
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
        text={cameraRollText}
      />
      <View style={styles.spaceAfterButtons} />
      <TouchableOpacity onPress={navigateBack}>
        <Text style={styles.linkText}>{i18n.t( "social.back_to_id" )}</Text>
      </TouchableOpacity>
    </ScrollNoHeader>
  );
};

export default SocialScreen;
