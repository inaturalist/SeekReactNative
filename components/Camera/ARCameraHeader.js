// @flow

import React from "react";
import {
  View,
  Text
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
        {ranks[rankToRender][0].name}
      </Text>
    ) : null}
    {ranks && rankToRender ? (
      <View style={styles.dotRow}>
        <View style={ranks.kingdom ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.phylum ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.class ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.order ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.family ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.genus ? styles.greenDot : styles.whiteDot} />
        <View style={ranks.species ? styles.greenDot : styles.whiteDot} />
      </View>
    ) : null}
  </View>
);

export default ARCameraHeader;
