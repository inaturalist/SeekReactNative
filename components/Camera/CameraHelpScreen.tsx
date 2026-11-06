import * as React from "react";
import {
  Image,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import { imageStyles, textStyles, viewStyles } from "../../styles/camera/help";
import { baseTextStyles } from "../../styles/textStyles";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../UIComponents/StyledText";

const CameraHelpScreen = ( ) => {
  // Same rank names the Seek Camera uppercases on its identification bar.
  const taxonomicRanks = [
    { rank: "kingdom", label: i18n.t( "camera.kingdom" ) },
    { rank: "phylum", label: i18n.t( "camera.phylum" ) },
    { rank: "class", label: i18n.t( "camera.class" ) },
    { rank: "order", label: i18n.t( "camera.order" ) },
    { rank: "family", label: i18n.t( "camera.family" ) },
    { rank: "genus", label: i18n.t( "camera.genus" ) },
    { rank: "species", label: i18n.t( "camera.species" ) },
  ];
  const tips = [
    i18n.t( "camera_help.tip_1" ),
    i18n.t( "camera_help.tip_2" ),
    i18n.t( "camera_help.tip_3" ),
    i18n.t( "camera_help.tip_4" ),
  ];

  return (
    <ScrollWithHeader header="camera_help.title" route="Camera">
      <View style={imageStyles.banner}>
        <Image source={icons.cameraHelpTop} style={imageStyles.topImage} />
        <View style={imageStyles.rankRow}>
          {taxonomicRanks.map( ( { rank, label } ) => (
            <View key={rank} style={imageStyles.rankColumn}>
              <View style={imageStyles.dot} />
              <View style={imageStyles.labelSlot}>
                <View style={imageStyles.labelRotate}>
                  <StyledText
                    allowFontScaling={false}
                    adjustsFontSizeToFit
                    minimumFontScale={0.6}
                    numberOfLines={1}
                    style={imageStyles.rankLabel}
                  >
                    {label.toLocaleUpperCase( )}
                  </StyledText>
                </View>
              </View>
            </View>
          ) )}
        </View>
      </View>
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
      <SafeAreaView edges={["bottom"]} />
    </ScrollWithHeader>
  );
};

export default CameraHelpScreen;
