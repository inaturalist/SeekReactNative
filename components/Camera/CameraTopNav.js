// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

import styles from "../../styles/cameraNavBar";

type Props = {
  navigation: any
}

class CameraTopNav extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front",
      error: null,
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on"
    };
  }

  toggleFlash() {
    const {
      flash
    } = this.state;

    if ( flash === RNCamera.Constants.FlashMode.off ) {
      this.setState( {
        flash: RNCamera.Constants.FlashMode.on,
        flashText: "Flash off"
      } );
    } else {
      this.setState( {
        flash: RNCamera.Constants.FlashMode.off,
        flashText: "Flash on"
      } );
    }
  }

  toggleCamera() {
    const {
      cameraType
    } = this.state;

    if ( cameraType === RNCamera.Constants.Type.back ) {
      this.setState( {
        cameraType: RNCamera.Constants.Type.front,
        cameraTypeText: "Back"
      } );
    } else {
      this.setState( {
        cameraType: RNCamera.Constants.Type.back,
        cameraTypeText: "Front"
      } );
    }
  }

  render() {
    const { flashText, cameraTypeText } = this.state;
    const { navigation } = this.props;
    const { index } = navigation.state;

    console.log( index, "navigation index in camera top nav" );

    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => this.toggleFlash()}
        >
          <Text style={styles.text}>{flashText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.toggleCamera()}
        >
          <Text style={styles.text}>{cameraTypeText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CameraTopNav;
