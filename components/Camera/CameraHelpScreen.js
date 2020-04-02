import React from "react";
import {
  Text,
  View,
  Image
} from "react-native";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import Footer from "../UIComponents/Footer";
import ScrollWithHeader from "../UIComponents/ScrollWithHeader";

const CameraHelpScreen = () => {
  const tips = [
    i18n.t( "camera_help.tip_1" ),
    i18n.t( "camera_help.tip_2" ),
    i18n.t( "camera_help.tip_3" ),
    i18n.t( "camera_help.tip_4" )
  ];

  return (
    <>
      <ScrollWithHeader
        header="camera_help.title"
        route="Camera"
      >
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
      </ScrollWithHeader>
      <Footer />
    </>
  );
};

export default CameraHelpScreen;
