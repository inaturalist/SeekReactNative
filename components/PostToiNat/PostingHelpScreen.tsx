import * as React from "react";
import {
  View,
  Image
} from "react-native";

import { viewStyles, textStyles, imageStyles } from "../../styles/posting/postingHelp";
import i18n from "../../i18n";
import icons from "../../assets/posting";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

const PostingHelpScreen = ( ) => (
  <ScrollWithHeader header="posting_help.header">
    <View style={viewStyles.textContainer}>
      <View style={viewStyles.row}>
        <Image source={icons.searchGreen} style={imageStyles.icon} />
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>{i18n.t( "posting_help.identification" ).toLocaleUpperCase()}</StyledText>
      </View>
      <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.id_description" )}</StyledText>
      <View style={viewStyles.row}>
        <Image source={icons.date} style={imageStyles.icon} />
        <View style={viewStyles.marginRight} />
        <Image source={icons.location} style={imageStyles.icon} />
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>{i18n.t( "posting_help.date" ).toLocaleUpperCase()}</StyledText>
      </View>
      <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.date_description" )}</StyledText>
      <View style={viewStyles.row}>
        <Image source={icons.geoprivacy} style={imageStyles.icon} />
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>{i18n.t( "posting_help.geoprivacy" ).toLocaleUpperCase()}</StyledText>
      </View>
      <View style={viewStyles.paragraph} />
      <StyledText style={viewStyles.paragraph}>
        <StyledText style={baseTextStyles.bodyBold}>{i18n.t( "posting_help.open_header" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.open" )}</StyledText>
      </StyledText>
      <StyledText style={viewStyles.paragraph}>
        <StyledText style={baseTextStyles.bodyBold}>{i18n.t( "posting_help.obscured_header" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.obscured" )}</StyledText>
      </StyledText>
      <StyledText style={viewStyles.paragraph}>
        <StyledText style={baseTextStyles.bodyBold}>{i18n.t( "posting_help.closed_header" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.closed" )}</StyledText>
      </StyledText>
      <View style={viewStyles.margin} />
      <View style={viewStyles.row}>
        <Image source={icons.captive} style={imageStyles.icon} />
        <StyledText style={[baseTextStyles.header, textStyles.headerText]}>{i18n.t( "posting_help.captive" ).toLocaleUpperCase()}</StyledText>
      </View>
      <View style={viewStyles.paragraph} />
      <StyledText style={viewStyles.paragraph}>
        <StyledText style={baseTextStyles.bodyBold}>{i18n.t( "posting_help.no_header" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.no" )}</StyledText>
      </StyledText>
      <StyledText style={viewStyles.paragraph}>
        <StyledText style={baseTextStyles.bodyBold}>{i18n.t( "posting_help.yes_header" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "posting_help.yes" )}</StyledText>
      </StyledText>
      <View style={viewStyles.margin} />
      <StyledText style={[baseTextStyles.bodyItalic, textStyles.italicText]}>{i18n.t( "posting_help.addendum" )}</StyledText>
    </View>
  </ScrollWithHeader>
);

export default PostingHelpScreen;
