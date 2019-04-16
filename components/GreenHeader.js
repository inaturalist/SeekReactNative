// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";

import styles from "../styles/greenHeader";
import BackArrow from "./BackArrow";

type Props = {
  header: string,
  navigation: any
}

const GreenHeader = ( { header, navigation }: Props ) => (
  <View style={styles.container}>
    <BackArrow navigation={navigation} />
    <Text style={styles.text}>{header ? header.toLocaleUpperCase() : null}</Text>
  </View>
);

export default GreenHeader;
