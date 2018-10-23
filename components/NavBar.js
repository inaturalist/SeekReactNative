import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../styles/navbar";

const NavBar = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => console.log( "go back" )}>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  </View>
);

export default NavBar;
