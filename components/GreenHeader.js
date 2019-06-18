// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";

import styles from "../styles/greenHeader";
import BackArrow from "./BackArrow";
import CustomBackArrow from "./CustomBackArrow";

type Props = {
  header: string,
  navigation: any,
  route: string
}

const GreenHeader = ( { header, navigation, route }: Props ) => (
  <View style={styles.container}>
    {route
      ? <CustomBackArrow navigation={navigation} route={route} />
      : <BackArrow navigation={navigation} />
    }
    <Text style={styles.text}>{header ? header.toLocaleUpperCase() : null}</Text>
  </View>
);

export default GreenHeader;
