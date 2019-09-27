// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import GreenHeader from "../GreenHeader";
import icons from "../../assets/icons";
import Padding from "../Padding";

type Props = {
  navigation: any
}


class CameraHelpScreen extends Component<Props> {
  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  render() {
    const { navigation } = this.props;

    const tips = [
      i18n.t( "camera_help.tip_1" ),
      i18n.t( "camera_help.tip_2" ),
      i18n.t( "camera_help.tip_3" ),
      i18n.t( "camera_help.tip_4" )
    ];

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <StatusBar barStyle="light-content" />
          <NavigationEvents
            onWillFocus={() => this.scrollToTop()}
          />
          <GreenHeader
            navigation={navigation}
            header={i18n.t( "camera_help.title" )}
            route="Camera"
          />
          <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
            <Image style={styles.topImage} source={icons.cameraHelpTop} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{i18n.t( "camera_help.explanation_1" )}</Text>
              <Text style={styles.secondHeaderText}>{i18n.t( "camera_help.header" ).toLocaleUpperCase()}</Text>
              <Text style={styles.text}>{i18n.t( "camera_help.explanation_2" )}</Text>
              <Text style={styles.secondHeaderText}>{i18n.t( "camera_help.header_1" ).toLocaleUpperCase()}</Text>
              <View style={styles.row}>
                <View style={styles.howText}>
                  <Text style={styles.text}>{i18n.t( "camera_help.how_works" )}</Text>
                </View>
                <Image source={icons.cameraHelpTree} />
              </View>
              <Text style={styles.secondHeaderText}>{i18n.t( "camera_help.header_2" ).toLocaleUpperCase()}</Text>
              <Text style={styles.text}>{i18n.t( "camera_help.tips" )}</Text>
              <Text style={styles.secondHeaderText}>{i18n.t( "camera_help.header_3" ).toLocaleUpperCase()}</Text>
              {tips.map( ( tip, index ) => (
                <View style={styles.tips} key={`${tip}${index}`}>
                  <Text style={styles.bullets}>&#8226;</Text>
                  <View style={styles.tipContainer}>
                    <Text style={styles.text}>{tip}</Text>
                  </View>
                </View>
              ) )}
            </View>
            <Padding />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default CameraHelpScreen;
