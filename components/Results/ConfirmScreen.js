// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/results/confirm";
import LoadingWheel from "../UIComponents/LoadingWheel";

type Props = {
  +image: Object,
  +navigation: any,
  +match: boolean,
  +checkForMatches: Function,
  +clicked: boolean
}

const ConfirmScreen = ( {
  image,
  checkForMatches,
  navigation,
  match,
  clicked
}: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={icons.backButtonGreen} style={styles.buttonImage} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{i18n.t( "confirm.identify" ).toLocaleUpperCase()}</Text>
      <View />
    </View>
    <View style={styles.imageContainer}>
      {clicked && match === null ? (
        <View style={styles.loadingWheel}>
          <LoadingWheel color="white" />
        </View>
      ) : null}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : null}
    </View>
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => checkForMatches()}
        style={[styles.button, clicked && styles.lightButton]}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "confirm.button" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ConfirmScreen;
