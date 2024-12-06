// @flow

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { viewStyles } from "../../../styles/camera/gallery";
import GalleryImageList from "./GalleryImageList";

const GalleryScreen = (): Node => {
  const renderImageList = ( ) => {
    return <GalleryImageList />;
  };

  return (
    <SafeAreaView style={viewStyles.background} edges={["top"]}>
      {renderImageList( )}
    </SafeAreaView>
  );
};

export default GalleryScreen;
