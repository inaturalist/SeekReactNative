// @flow

import React from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import Footer from "../Challenges/ChallengeFooter";
import GreenHeader from "../GreenHeader";
import icons from "../../assets/icons";
import Padding from "../Padding";

type Props = {
  navigation: any
}

const CameraHelpScreen = ( { navigation }: Props ) => {
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
        <GreenHeader navigation={navigation} header={i18n.t( "camera_help.title" )} />
        <ScrollView>
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
            <FlatList
              data={tips}
              scrollEnabled={false}
              keyExtractor={( item, index ) => `${item}${index}`}
              renderItem={( { item } ) => (
                <View style={styles.tips}>
                  <Text style={styles.bullets}>&#8226;</Text>
                  <View style={styles.tipContainer}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          <Padding />
        </ScrollView>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

export default CameraHelpScreen;
