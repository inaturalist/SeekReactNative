import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import icons from "../../assets/icons";
import Padding from "../UIComponents/Padding";

class CameraHelpScreen extends Component {
  scrollView: ?any

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  render() {
    const tips = [
      i18n.t( "camera_help.tip_1" ),
      i18n.t( "camera_help.tip_2" ),
      i18n.t( "camera_help.tip_3" ),
      i18n.t( "camera_help.tip_4" )
    ];

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <StatusBar barStyle="light-content" />
        <NavigationEvents
          onWillFocus={() => this.scrollToTop()}
        />
        <GreenHeader
          header={i18n.t( "camera_help.title" )}
          route="Camera"
        />
        <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
          <Image source={icons.cameraHelpTop} style={styles.topImage} />
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
            {tips.map( ( tip ) => (
              <View key={`${tip}`} style={styles.tips}>
                <Text style={styles.bullets}>&#8226;</Text>
                <View style={styles.tipContainer}>
                  <Text style={styles.text}>{tip}</Text>
                </View>
              </View>
            ) )}
          </View>
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default CameraHelpScreen;
