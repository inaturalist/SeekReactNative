import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Node } from "react";
import { TouchableOpacity, View } from "react-native";

import i18n from "../../i18n";
import { colors, dimensions } from "../../styles/global";
import { textStyles, viewStyles } from "../../styles/social/social";
import { saveToCameraRoll, shareToFacebook } from "../../utility/socialHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";
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
        <StyledText style={textStyles.linkText}>{i18n.t( "social.back_to_id" )}</StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;
