// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/species/species";
import GreenText from "./GreenText";

type Props = {
  +children: any,
  +text: string,
  +hide?: boolean
};

const SpeciesDetailCard = ( { children, text, hide }: Props ) => {
  if ( hide ) {
    return null;
  }
  return (
    <View style={styles.textContainer}>
      <View style={styles.headerMargins}>
        <GreenText text={text} />
      </View>
      {children}
    </View>
  );
};

SpeciesDetailCard.defaultProps = {
  hide: false
};

export default SpeciesDetailCard;
