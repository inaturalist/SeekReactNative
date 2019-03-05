import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
// import RNFS from "react-native-fs";
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
    console.log( `Camera error: ${event.nativeEvent.error}` );
  }

  onCameraPermissionMissing = event => {
    console.log( `Missing camera permission` )
  }

  onClassifierError = event => {
    console.log( `Classifier error: ${event.nativeEvent.error}` )
  }

  onDeviceNotSupported = event => {
    console.log( `Device not supported, reason: ${event.nativeEvent.reason}` )
  }

  // readAssets() {
  //   RNFS.readDir( RNFS.ExternalStorageDirectoryPath ).then( result => {
  //     console.log( result, "result" );
  //   } ).catch( err => console.log( "err: ", err ))
  // }

  render() {
    const { content } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>iNaturalist Native Camera Demo</Text>
        {/* <INatCamera
          onTaxaDetected={this.onTaxaDetected}
          onCameraError={this.onCameraError}
          onCameraPermissionMissing={this.onCameraPermissionMissing}
          onClassifierError={this.onClassifierError}
          onDeviceNotSupported={this.onDeviceNotSupported}
          modelPath="/Download/optimized_model.tflite"
          taxonomyPath="/Download/taxonomy_data.csv"
          taxaDetectionInterval="2000"
          style={styles.camera}
        /> */}
        <Text style={styles.predictions}>
          {content}
        </Text>
      </View>
    );
  }
}

export default ARCamera;
