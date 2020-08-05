import React from "react";
import {
  Text,
  View,
  Image
} from "react-native";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const CameraHelpScreen = () => {
  const tips = [
    i18n.t( "camera_help.tip_1" ),
    i18n.t( "camera_help.tip_2" ),
    i18n.t( "camera_help.tip_3" ),
    i18n.t( "camera_help.tip_4" )
  ];

  return (
    <ScrollWithHeader header="camera_help.title" route="Camera">
      <Image source={icons.cameraHelpTop} style={styles.topImage} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "camera_help.explanation_1" )}</Text>
        <Text style={styles.headerText}>{i18n.t( "camera_help.header" ).toLocaleUpperCase()}</Text>
        <Text style={styles.text}>{i18n.t( "camera_help.explanation_2" )}</Text>
        <Text style={styles.headerText}>{i18n.t( "camera_help.header_1" ).toLocaleUpperCase()}</Text>
        <View style={styles.row}>
          <Text style={[styles.text, styles.howText]}>{i18n.t( "camera_help.how_works" )}</Text>
          <Image source={icons.cameraHelpTree} />
        </View>
        <Text style={styles.headerText}>{i18n.t( "camera_help.header_2" ).toLocaleUpperCase()}</Text>
        <Text style={styles.text}>{i18n.t( "camera_help.tips" )}</Text>
        <Text style={styles.headerText}>{i18n.t( "camera_help.header_3" ).toLocaleUpperCase()}</Text>
        {tips.map( ( tip ) => (
          <View key={`${tip}`} style={styles.tips}>
            <Text style={styles.bullets}>&#8226;</Text>
            <Text style={[styles.text, styles.tipContainer]}>{tip}</Text>
          </View>
        ) )}
      </View>
    </ScrollWithHeader>
  );
};

export default CameraHelpScreen;
