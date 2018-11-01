// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";

import styles from "../styles/navbar";

type Props = {
  navigation: any
}

const NavBar = ( { navigation }: Props ) => {
  const popAction = StackActions.pop();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.dispatch( popAction )}>
        <Text style={styles.text}>{"<"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
