// @flow
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  navigation: any
}

const AboutTitle = ( { navigation }: Props ) => (
  <View style={{ position: "absolute", right: 0 }}>
    <TouchableOpacity
      onPress={() => navigation.navigate( "About" )}
    >
      <Text>About</Text>
    </TouchableOpacity>
  </View>
);

export default AboutTitle;
