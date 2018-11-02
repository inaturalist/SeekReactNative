// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";

type Props = {
  navigation: any,
  id: number
}

class CameraNavBar extends Component {
  constructor( { navigation, id }: Props ) {
    super();

    this.state = {
      camera: true
    };
  }

  render() {
    const { id, navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
          onPress={() => navigation.navigate( "CameraCapture", { id } )}
        >
          <Text style={styles.buttonText}>CAMERA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
          onPress={() => navigation.navigate( "Gallery", { id } )}
        >
          <Text style={styles.buttonText}>GALLERY</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CameraNavBar;
