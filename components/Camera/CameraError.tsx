import * as React from "react";
import { Linking, Platform, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getSystemVersion } from "react-native-device-info";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/camera/cameraError";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly error: string;
  readonly errorEvent: string | null;
}

const CameraError = ( { error, errorEvent }: Props ) => {
  const { name } = useRoute();

  const setCameraErrorText = ( err: string, event: string ) => {
    let errorText = i18n.t( `camera.error_${err}` );

    if ( event ) {
      errorText += `\n\n${event.toString()}`;
    } else if ( Platform.OS === "ios" ) {
      const OS = getSystemVersion( );
      const majorVersionNumber = Number( OS.split( "." )[0] );

      if ( majorVersionNumber >= 14 ) {
        errorText += `\n\n${i18n.t( "camera.error_selected_photos" )}`;
      }
    }
    return errorText;
  };

  const openSettings = () => Linking.openSettings();

  const showPermissionsButton = () => {
    if ( Platform.OS === "android" ) {
      return (
        <>
          <View style={viewStyles.margin} />
          <GreenButton
            handlePress={openSettings}
            text="camera.permissions"
            fontSize={16}
            width={323}
          />
        </>
      );
    }
    return (
      <>
        <View style={viewStyles.margin} />
        <StyledText style={[baseTextStyles.banner, textStyles.whiteText]}>
          {i18n.t( "camera.please_permissions" ).toLocaleUpperCase()}
        </StyledText>
      </>
    );
  };

  return (
    <View style={[viewStyles.blackBackground, viewStyles.center, name === "Gallery" && viewStyles.galleryHeight]}>
      <StyledText allowFontScaling={false} numberOfLines={23} style={[baseTextStyles.emptyStateWhite, textStyles.errorText]}>
        {setCameraErrorText( error, errorEvent )}
      </StyledText>
      {( error === "permissions" || error === "gallery" ) && showPermissionsButton()}
    </View>
  );
};

export default CameraError;
