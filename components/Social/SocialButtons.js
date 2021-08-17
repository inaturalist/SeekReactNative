// @flow

import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/social/social";
import { dimensions, colors } from "../../styles/global";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import i18n from "../../i18n";
import { shareToFacebook, saveToCameraRoll } from "../../utility/socialHelpers";
import { UserContext } from "../UserContext";

type Props = {
  image: ?string,
  tab: string,
  disabled: boolean
};

const SocialButtons = ( { image, tab, disabled }: Props ): Node => {
  const { login } = useContext( UserContext );

  const [saved, setSaved] = useState( false );
  const navigation = useNavigation( );
  const navigateBack = ( ) => navigation.goBack( );

  const shareToSocial = ( ) => {
    if ( !image ) { return; }
    shareToFacebook( image );
  };

  const saveWatermarkedImage = async ( ) => {
    if ( !image ) { return; }
    const completedSave = await saveToCameraRoll( image );
    if ( completedSave ) {
      setSaved( true );
    }
  };

  const setSaveToCameraText = ( ) => {
    let text = "social.save_to_photo_library";
    if ( saved ) {
      text = "social.saved_to_photo_library";
    }
    return text;
  };

  const cameraRollText = setSaveToCameraText( );

  useEffect( ( ) => {
    // reset state when tab changes
    setSaved( false );
  }, [tab] );

  return (
    <View style={viewStyles.spaceBeforeButtons}>
      {login && (
        <>
          <GreenButton
            width={dimensions.width}
            handlePress={shareToSocial}
            text="social.share"
            disabled={disabled}
            color={disabled && colors.seekTransparent}
          />
          <View style={viewStyles.spaceBetweenButtons} />
        </>
      )}
      <GreenButton
        width={dimensions.width}
        handlePress={saveWatermarkedImage}
        text={cameraRollText}
        disabled={disabled}
        color={disabled && colors.seekTransparent}
      />
      <TouchableOpacity onPress={navigateBack}>
        <Text style={textStyles.linkText}>{i18n.t( "social.back_to_id" )}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;
