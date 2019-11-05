
// @flow
import React from "react";
import { ImageBackground, View } from "react-native";
import LoadingWheel from "../UIComponents/LoadingWheel";

import styles from "../../styles/results/fullPhotoLoading";

type Props = {
  +uri: string
};

const FullPhotoLoading = ( { uri }: Props ) => (
  <ImageBackground
    source={{ uri }}
    style={styles.imageBackground}
  >
    <View style={styles.loading}>
      <LoadingWheel color="white" />
    </View>
  </ImageBackground>
);

export default FullPhotoLoading;
