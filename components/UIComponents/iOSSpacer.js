// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/uiComponents/iOSSpacer";

type Props = {
  +backgroundColor: ?string
};

const iOSSpacer = ( { backgroundColor }: Props ) => (
  <View style={[styles.iosSpacer, backgroundColor && { backgroundColor }]} />
);

export default iOSSpacer;
