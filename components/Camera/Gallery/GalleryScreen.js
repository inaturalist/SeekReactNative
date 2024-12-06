// @flow

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { viewStyles } from "../../../styles/camera/gallery";

const GalleryScreen = (): Node => {

  return (
    <SafeAreaView style={viewStyles.background} edges={["top"]}>
    </SafeAreaView>
  );
};

export default GalleryScreen;
