// @flow
import React from "react";
import { SafeAreaView } from "react-native";

import styles from "../../styles/uiComponents/safeView";

type Props = {
  +color: ?string
}

const SafeView = ( { color }: Props ) => (
  <SafeAreaView style={[styles.safeViewTop, color && { backgroundColor: color }]} />
);

export default SafeView;
