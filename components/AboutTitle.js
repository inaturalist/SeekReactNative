// @flow
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../styles/about";

type Props = {
  navigation: any
}

const AboutTitle = ( { navigation }: Props ) => (
  <View style={styles.headerText}>
    <TouchableOpacity
      onPress={() => navigation.navigate( "About" )}
    >
      <Text>About</Text>
    </TouchableOpacity>
  </View>
);

export default AboutTitle;
