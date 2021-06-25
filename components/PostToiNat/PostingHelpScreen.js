// @flow

import * as React from "react";
import {
  Text,
  View,
  Image
} from "react-native";
import type { Node } from "react";

import styles from "../../styles/posting/postingHelp";
import i18n from "../../i18n";
import icons from "../../assets/posting";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const PostingHelpScreen = ( ): Node => (
  <ScrollWithHeader header="posting_help.header">
    <View style={styles.textContainer}>
      <View style={styles.row}>
        <Image source={icons.searchGreen} style={styles.icon} />
        <Text style={styles.headerText}>{i18n.t( "posting_help.identification" ).toLocaleUpperCase()}</Text>
      </View>
      <Text style={styles.text}>{i18n.t( "posting_help.id_description" )}</Text>
      <View style={styles.row}>
        <Image source={icons.date} style={styles.icon} />
        <View style={styles.marginRight} />
        <Image source={icons.location} style={styles.icon} />
        <Text style={styles.headerText}>{i18n.t( "posting_help.date" ).toLocaleUpperCase()}</Text>
      </View>
      <Text style={styles.text}>{i18n.t( "posting_help.date_description" )}</Text>
      <View style={styles.row}>
        <Image source={icons.geoprivacy} style={styles.icon} />
        <Text style={styles.headerText}>{i18n.t( "posting_help.geoprivacy" ).toLocaleUpperCase()}</Text>
      </View>
      <View style={styles.paragraph} />
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>{i18n.t( "posting_help.open_header" )}</Text>
        <Text style={styles.text}>{i18n.t( "posting_help.open" )}</Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>{i18n.t( "posting_help.obscured_header" )}</Text>
        <Text style={styles.text}>{i18n.t( "posting_help.obscured" )}</Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>{i18n.t( "posting_help.closed_header" )}</Text>
        <Text style={styles.text}>{i18n.t( "posting_help.closed" )}</Text>
      </Text>
      <View style={styles.margin} />
      <View style={styles.row}>
        <Image source={icons.captive} style={styles.icon} />
        <Text style={styles.headerText}>{i18n.t( "posting_help.captive" ).toLocaleUpperCase()}</Text>
      </View>
      <View style={styles.paragraph} />
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>{i18n.t( "posting_help.no_header" )}</Text>
        <Text style={styles.text}>{i18n.t( "posting_help.no" )}</Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>{i18n.t( "posting_help.yes_header" )}</Text>
        <Text style={styles.text}>{i18n.t( "posting_help.yes" )}</Text>
      </Text>
      <View style={styles.margin} />
      <Text style={styles.italicText}>{i18n.t( "posting_help.addendum" )}</Text>
    </View>
  </ScrollWithHeader>
);

export default PostingHelpScreen;
