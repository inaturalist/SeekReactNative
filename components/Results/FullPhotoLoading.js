// @flow
import React from "react";
import { ImageBackground, View } from "react-native";
import LoadingWheel from "../UIComponents/LoadingWheel";

import styles from "../../styles/results/fullPhotoLoading";

type Props = {
  +uri: ?string
};

const FullPhotoLoading = ( { uri }: Props ) => {
  if ( uri ) {
    return (
      <ImageBackground
        source={{ uri }}
        style={styles.imageBackground}
        imageStyle={styles.contain}
      >
        <LoadingWheel color="white" />
      </ImageBackground>
    );
  }
  return (
    <View style={[styles.imageBackground]}>
      <LoadingWheel color="white" />
    </View>
  );
};

export default FullPhotoLoading;
