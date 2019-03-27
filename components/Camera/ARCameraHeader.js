// @flow

import React from "react";
import {
  View,
  Text,
  Platform
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import rankDict from "../../utility/rankDict";

type Props = {
  ranks: Object,
  rankToRender: string
}

const ARCameraHeader = ( {
  ranks,
  rankToRender
}: Props ) => (
  <View style={styles.header}>
    {rankToRender ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>
          {i18n.t( rankDict[rankToRender] ).toLocaleUpperCase()}
        </Text>
      </View>
    ) : null}
    {rankToRender ? (
      <Text style={styles.predictions}>
        {Platform.OS === "android" ? ranks[rankToRender].name : null}
        {Platform.OS === "ios" ? ranks[rankToRender][0].name : null}
      </Text>
    ) : null}
    {ranks && rankToRender ? (
      <View style={styles.dotRow}>
        <View style={ranks.kingdom || ranks.phylum || ranks.class || ranks.order || ranks.family || ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.phylum || ranks.class || ranks.order || ranks.family || ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.class || ranks.order || ranks.family || ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.order || ranks.family || ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.family || ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.genus || ranks.species ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.species ? styles.greenDot : styles.whiteDot} />
      </View>
    ) : null}
  </View>
);

export default ARCameraHeader;
