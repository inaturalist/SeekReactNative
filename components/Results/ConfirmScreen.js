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
        <Image source={icons.backButtonGreen} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{i18n.t( "confirm.identify" ).toLocaleUpperCase()}</Text>
      <View />
    </View>
    <View style={styles.imageContainer}>
      {loading && photoConfirmed ? <LoadingWheel /> : null}
      <Image
        source={{ uri: image.uri }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => confirmPhoto()}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "confirm.button" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default ConfirmScreen;
