// @flow

import * as React from "react";
import {
  Text,
  View,
  Image
} from "react-native";

import { imageStyles, viewStyles, textStyles } from "../../styles/camera/help";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const CameraHelpScreen = ( ): React.Node => {
  const tips = [
    i18n.t( "camera_help.tip_1" ),
    i18n.t( "camera_help.tip_2" ),
    i18n.t( "camera_help.tip_3" ),
    i18n.t( "camera_help.tip_4" )
  ];

  return (
    <ScrollWithHeader header="camera_help.title" route="Camera">
      <Image source={icons.cameraHelpTop} style={imageStyles.topImage} />
      <View style={viewStyles.textContainer}>
        <Text style={textStyles.text}>{i18n.t( "camera_help.explanation_1" )}</Text>
        <Text style={textStyles.headerText}>{i18n.t( "camera_help.header" ).toLocaleUpperCase()}</Text>
        <Text style={textStyles.text}>{i18n.t( "camera_help.explanation_2" )}</Text>
        <Text style={textStyles.headerText}>{i18n.t( "camera_help.header_1" ).toLocaleUpperCase()}</Text>
        <View style={viewStyles.row}>
          <Text style={[textStyles.text, viewStyles.howText]}>{i18n.t( "camera_help.how_works" )}</Text>
          <Image source={icons.cameraHelpTree} />
        </View>
        <Text style={textStyles.headerText}>{i18n.t( "camera_help.header_2" ).toLocaleUpperCase()}</Text>
        <Text style={textStyles.text}>{i18n.t( "camera_help.tips" )}</Text>
        <Text style={textStyles.headerText}>{i18n.t( "camera_help.header_3" ).toLocaleUpperCase()}</Text>
        {tips.map( ( tip: string ) => (
          <View key={`${tip}`} style={viewStyles.tips}>
            <Text style={textStyles.bullets}>&#8226;</Text>
            <Text style={[textStyles.text, viewStyles.tipContainer]}>{tip}</Text>
          </View>
        ) )}
      </View>
    </ScrollWithHeader>
  );
};

export default CameraHelpScreen;
