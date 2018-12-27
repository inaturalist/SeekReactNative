// @flow

import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  View
} from "react-native";

import i18n from "../i18n";
import Button from "./Button";
import styles from "../styles/warnings";

type Props = {
  navigation: any
}

const tips = [
  { tip: i18n.t( "warnings.tip_1", { language: i18n.currentLocale() } ) },
  { tip: i18n.t( "warnings.tip_2", { language: i18n.currentLocale() } ) },
  { tip: i18n.t( "warnings.tip_3", { language: i18n.currentLocale() } ) },
  { tip: i18n.t( "warnings.tip_4", { language: i18n.currentLocale() } ) }
];

const WarningsScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>{i18n.t( "warnings.welcome", { language: i18n.currentLocale() } )}</Text>
        <Text style={styles.earnText}>
          {i18n.t( "warnings.earn_badges", { language: i18n.currentLocale() } )}
        </Text>
      </View>
      <View style={styles.tipContainer}>
        <FlatList
          data={tips}
          scrollEnabled={false}
          keyExtractor={( item, index ) => `${item}${index}`}
          renderItem={( { item } ) => (
            <View style={styles.tipList}>
              <Text style={styles.checkMark}>&#xf00c;</Text>
              <Text style={styles.tips}>{item.tip}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimer}>
          {i18n.t( "warnings.disclaimer", { language: i18n.currentLocale() } )}
        </Text>
      </View>
      <Button navigation={navigation} buttonText="OK. Got it!" />
    </ImageBackground>
  </View>
);

export default WarningsScreen;
