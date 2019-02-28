import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import INatCamera from "../../INatCamera";

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  camera: {
    width: "100%",
    height: 450,
    backgroundColor: "black"
  },
  predictions: {
    margin: 10,
    fontSize: 10,
    fontFamily: "sans-serif-condensed",
    color: "black"
  }
} );

class ARCamera extends Component {
  constructor() {
    super();

    this.state = {
      content: null
    };
  }

  onTaxaDetected = event => {
    let predictions = Object.assign( {}, event.nativeEvent );
    console.log( predictions, "predictions" );

    this.setState( previousState => (
      { content: JSON.stringify( predictions ) }
    ) )
  }

  onCameraError = event => {
    Alert.alert( `Camera error: ${event.nativeEvent.error}` );
  }

  onCameraPermissionMissing = event => {
    Alert.alert( `Missing camera permission` )
  }

  onClassifierError = event => {
    Alert.alert( `Classifier error: ${event.nativeEvent.error}` )
  }

  onDeviceNotSupported = event => {
    Alert.alert( `Device not supported, reason: ${event.nativeEvent.reason}` )
  }

  render() {
    const { content } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>iNaturalist Native Camera Demo</Text>
        <INatCamera
          onTaxaDetected={this.onTaxaDetected}
          onCameraError={this.onCameraError}
          onCameraPermissionMissing={this.onCameraPermissionMissing}
          onClassifierError={this.onClassifierError}
          onDeviceNotSupported={this.onDeviceNotSupported}
          modelPath="../../optimized_model.tflite"
          modelSize="24875"
          taxonomyPath="../../taxonomy_data.csv"
          taxaDetectionInterval="2000"
          // style={styles.camera}
        />
        <Text style={styles.predictions}>
          {content}
        </Text>
      </View>
    );
  }
}

export default ARCamera;
