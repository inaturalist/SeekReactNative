// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";

import styles from "../styles/navbar";

type Props = {
  navigation: any,
  species: boolean
}

const NavBar = ( { navigation, species }: Props ) => {
  const popAction = StackActions.pop();

  return (
    <View style={[styles.container, species && styles.blueContainer]}>
      <TouchableOpacity onPress={() => navigation.dispatch( popAction )}>
        <Text style={[styles.text, species && styles.blueContainerText]}>{"<"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
