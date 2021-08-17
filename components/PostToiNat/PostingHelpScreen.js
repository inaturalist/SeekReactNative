// @flow

import * as React from "react";
import {
  Text,
  View,
  Image
} from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles, imageStyles } from "../../styles/posting/postingHelp";
import i18n from "../../i18n";
import icons from "../../assets/posting";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const PostingHelpScreen = ( ): Node => (
  <ScrollWithHeader header="posting_help.header">
    <View style={viewStyles.textContainer}>
      <View style={viewStyles.row}>
        <Image source={icons.searchGreen} style={imageStyles.icon} />
        <Text style={textStyles.headerText}>{i18n.t( "posting_help.identification" ).toLocaleUpperCase()}</Text>
      </View>
      <Text style={textStyles.text}>{i18n.t( "posting_help.id_description" )}</Text>
      <View style={viewStyles.row}>
        <Image source={icons.date} style={imageStyles.icon} />
        <View style={viewStyles.marginRight} />
        <Image source={icons.location} style={imageStyles.icon} />
        <Text style={textStyles.headerText}>{i18n.t( "posting_help.date" ).toLocaleUpperCase()}</Text>
      </View>
      <Text style={textStyles.text}>{i18n.t( "posting_help.date_description" )}</Text>
      <View style={viewStyles.row}>
        <Image source={icons.geoprivacy} style={imageStyles.icon} />
        <Text style={textStyles.headerText}>{i18n.t( "posting_help.geoprivacy" ).toLocaleUpperCase()}</Text>
      </View>
      <View style={viewStyles.paragraph} />
      <Text style={textStyles.paragraph}>
        <Text style={textStyles.boldText}>{i18n.t( "posting_help.open_header" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "posting_help.open" )}</Text>
      </Text>
      <Text style={textStyles.paragraph}>
        <Text style={textStyles.boldText}>{i18n.t( "posting_help.obscured_header" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "posting_help.obscured" )}</Text>
      </Text>
      <Text style={textStyles.paragraph}>
        <Text style={textStyles.boldText}>{i18n.t( "posting_help.closed_header" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "posting_help.closed" )}</Text>
      </Text>
      <View style={viewStyles.margin} />
      <View style={viewStyles.row}>
        <Image source={icons.captive} style={imageStyles.icon} />
        <Text style={textStyles.headerText}>{i18n.t( "posting_help.captive" ).toLocaleUpperCase()}</Text>
      </View>
      <View style={viewStyles.paragraph} />
      <Text style={textStyles.paragraph}>
        <Text style={textStyles.boldText}>{i18n.t( "posting_help.no_header" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "posting_help.no" )}</Text>
      </Text>
      <Text style={textStyles.paragraph}>
        <Text style={textStyles.boldText}>{i18n.t( "posting_help.yes_header" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "posting_help.yes" )}</Text>
      </Text>
      <View style={viewStyles.margin} />
      <Text style={textStyles.italicText}>{i18n.t( "posting_help.addendum" )}</Text>
    </View>
  </ScrollWithHeader>
);

export default PostingHelpScreen;
