// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";

type Props = {
  navigation: any,
  id: number
}

class CameraBottomNav extends Component {
  constructor( { navigation, id }: Props ) {
    super();

    this.state = {
      camera: true
    };
  }

  toggleActiveLink() {
    const { camera } = this.state;

    this.setState( {
      camera: !camera
    } );
  }

  render() {
    const { id, navigation } = this.props;
    const { camera } = this.state;

    return (
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
          onPress={() => {
            if ( !camera ) {
              this.toggleActiveLink();
              navigation.navigate( "CameraCapture", { id } );
            }
          }}
        >
          <Text style={[styles.text, camera && styles.underline]}>CAMERA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
          onPress={() => {
            if ( camera ) {
              this.toggleActiveLink();
              navigation.navigate( "Gallery", { id } );
            }
          }}
        >
          <Text style={[styles.text, !camera && styles.underline]}>PHOTOS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CameraBottomNav;
