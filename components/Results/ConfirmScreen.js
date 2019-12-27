// @flow

import React from "react";
import {
  View,
  Image,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/results/confirm";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenButton from "../UIComponents/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/BackArrow";

type Props = {
  +image: Object,
  +navigation: any,
  +match: ?boolean,
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
  <View>
    <SafeAreaView style={styles.safeViewTop} />
    <View style={styles.header}>
      <BackArrow green navigation={navigation} />
      <View style={styles.headerText}>
        <GreenText smaller text="confirm.identify" />
      </View>
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
      <GreenButton
        color={clicked ? "#38976d33" : null}
        handlePress={() => checkForMatches()}
        text={i18n.t( "confirm.button" )}
      />
    </View>
  </View>
);

export default ConfirmScreen;
