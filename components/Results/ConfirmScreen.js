// @flow

import React from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/results/confirm";
import { colors } from "../../styles/global";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";

type Props = {
  +image: Object,
  +updateClicked: Function,
  +clicked: boolean
}

const ConfirmScreen = ( {
  image,
  updateClicked,
  clicked
}: Props ) => (
  <SafeAreaView edges={["top"]}>
    <View style={styles.header}>
      <BackArrow green />
      <View style={styles.headerText}>
        <GreenText allowFontScaling={false} smaller text="confirm.identify" />
      </View>
      <View />
    </View>
    <View style={styles.imageContainer}>
      {clicked && (
        <View style={styles.loadingWheel}>
          <LoadingWheel color="white" />
        </View>
      )}
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
    </View>
    <View style={styles.footer}>
      <GreenButton
        color={clicked && colors.seekTransparent}
        handlePress={updateClicked}
        text="confirm.button"
      />
    </View>
  </SafeAreaView>
);

export default ConfirmScreen;
