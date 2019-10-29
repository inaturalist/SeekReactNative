
// @flow
import React from "react";
import { ImageBackground } from "react-native";
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
    <LoadingWheel color="white" />
  </ImageBackground>
);

export default FullPhotoLoading;
