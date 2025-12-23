import * as React from "react";
import {
  View,
  Image,
} from "react-native";

import { imageStyles, viewStyles, textStyles } from "../../styles/camera/help";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

const CameraHelpScreen = ( ) => {
  const tips = [
    i18n.t( "camera_help.tip_1" ),
    i18n.t( "camera_help.tip_2" ),
    i18n.t( "camera_help.tip_3" ),
    i18n.t( "camera_help.tip_4" ),
  ];

  return (
    <ScrollWithHeader header="camera_help.title" route="Camera">
      {/* TODO: extract the taxonomical ranks out of this image to make them translatable */}
      <Image source={icons.cameraHelpTop} style={imageStyles.topImage} />
      <View style={viewStyles.textContainer}>
        <StyledText style={baseTextStyles.body}>
          {i18n.t( "camera_help.explanation_1" )}
        </StyledText>
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>
          {i18n.t( "camera_help.header" ).toLocaleUpperCase()}
        </StyledText>
        <StyledText style={baseTextStyles.body}>
          {i18n.t( "camera_help.explanation_2" )}
        </StyledText>
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>
          {i18n.t( "camera_help.header_1" ).toLocaleUpperCase()}
        </StyledText>
        <View style={viewStyles.row}>
          <StyledText style={[baseTextStyles.body, viewStyles.howText]}>
            {i18n.t( "camera_help.how_works" )}
          </StyledText>
          <Image source={icons.cameraHelpTree} />
        </View>
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>
          {i18n.t( "camera_help.header_2" ).toLocaleUpperCase()}
        </StyledText>
        <StyledText style={baseTextStyles.body}>
          {i18n.t( "camera_help.tips" )}
        </StyledText>
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>
          {i18n.t( "camera_help.header_3" ).toLocaleUpperCase()}
        </StyledText>
        {tips.map( ( tip: string ) => (
          <View key={`${tip}`} style={viewStyles.tips}>
            <StyledText style={textStyles.bullets}>&#8226;</StyledText>
            <StyledText style={[baseTextStyles.body, viewStyles.tipContainer]}>
              {tip}
            </StyledText>
          </View>
        ) )}
      </View>
    </ScrollWithHeader>
  );
};

export default CameraHelpScreen;
