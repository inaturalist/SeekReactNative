// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/results/confirm";
import LoadingWheel from "../LoadingWheel";

type Props = {
  image: Object,
  loading: boolean,
  photoConfirmed: boolean,
  confirmPhoto: Function,
  navigation: any
}

const ConfirmScreen = ( {
  image,
  confirmPhoto,
  loading,
  photoConfirmed,
  navigation
}: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={icons.backButtonGreen} style={styles.buttonImage} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{i18n.t( "confirm.identify" ).toLocaleUpperCase()}</Text>
      <View />
    </View>
    <View style={styles.imageContainer}>
      {loading && photoConfirmed ? <LoadingWheel color="white" /> : null}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : null}
    </View>
    <View style={styles.footer}>
      {!photoConfirmed ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => confirmPhoto()}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "confirm.button" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.lightButton}>
          <Text style={styles.buttonText}>
            {i18n.t( "confirm.button" ).toLocaleUpperCase()}
          </Text>
        </View>
      )}
    </View>
  </View>
);

export default ConfirmScreen;
