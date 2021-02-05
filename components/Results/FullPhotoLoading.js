// @flow
import React from "react";
import { Image } from "react-native";
import LoadingWheel from "../UIComponents/LoadingWheel";

import styles from "../../styles/results/fullPhotoLoading";

type Props = {
  +uri: string
};

const FullPhotoLoading = ( { uri }: Props ) => (
  <>
    <Image
      source={{ uri }}
      style={styles.fullSizeImage}
    />
    <LoadingWheel color="white" />
  </>
);

export default FullPhotoLoading;
