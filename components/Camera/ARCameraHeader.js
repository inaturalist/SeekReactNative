// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import rankDict from "../../utility/dictionaries/rankDict";

type Props = {
  +commonName: ?string,
  +ranks: Object,
  +rankToRender: ?string
}

const ARCameraHeader = ( {
  commonName,
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
        {commonName || ranks[rankToRender][0].name}
      </Text>
    ) : null}
    {ranks && rankToRender ? (
      <View style={styles.dotRow}>
        <Image
          source={
            ranks.kingdom || ranks.phylum || ranks.class
            || ranks.order || ranks.family || ranks.genus
            || ranks.species
              ? icons.greenDot
              : icons.whiteDot
          }
          style={styles.dots}
        />
        <Image
          source={
            ranks.phylum || ranks.class || ranks.order
            || ranks.family || ranks.genus || ranks.species
              ? icons.greenDot
              : icons.whiteDot
          }
          style={styles.dots}
        />
        <Image
          source={ranks.class || ranks.order || ranks.family || ranks.genus || ranks.species
            ? icons.greenDot
            : icons.whiteDot}
          style={styles.dots}
        />
        <Image
          source={ranks.order || ranks.family || ranks.genus || ranks.species
            ? icons.greenDot
            : icons.whiteDot}
          style={styles.dots}
        />
        <Image
          source={ranks.family || ranks.genus || ranks.species ? icons.greenDot : icons.whiteDot}
          style={styles.dots}
        />
        <Image
          source={ranks.genus || ranks.species ? icons.greenDot : icons.whiteDot}
          style={styles.dots}
        />
        <Image
          source={ranks.species ? icons.greenDot : icons.whiteDot}
          style={styles.dots}
        />
      </View>
    ) : null}
  </View>
);

export default ARCameraHeader;
