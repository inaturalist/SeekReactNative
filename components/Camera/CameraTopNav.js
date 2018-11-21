// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

import styles from "../../styles/cameraNavBar";

type Props = {
  navigation: any,
  camera: boolean
}

class CameraTopNav extends Component {
  constructor( { navigation, camera }: Props ) {
    super();

    this.state = {
      camera: true,
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front",
      error: null,
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      image: {},
      time: null
    }
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
    const { camera, flashText, cameraTypeText } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Text style={[styles.text, !camera && styles.grayText]}>X</Text>
        </TouchableOpacity>
        { camera ? (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.toggleFlash()}
          >
            <Text style={styles.text}>{flashText}</Text>
          </TouchableOpacity>
        ) : null }
        { camera ? (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.toggleCamera()}
          >
            <Text style={styles.text}>{cameraTypeText}</Text>
          </TouchableOpacity>
        ) : null
        }
      </View>
    );
  }
}

export default CameraTopNav;
