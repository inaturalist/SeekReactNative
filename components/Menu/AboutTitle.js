// @flow
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/menu/about";
import { fonts, fontSize } from "../../styles/global";

type Props = {
  navigation: any
}

const AboutTitle = ( { navigation }: Props ) => (
  <View style={styles.headerText}>
    <TouchableOpacity
      onPress={() => navigation.navigate( "About" )}
    >
      <Text style={{ fontFamily: fonts.default, fontSize: fontSize.text }}>
        About
      </Text>
    </TouchableOpacity>
  </View>
);

export default AboutTitle;
