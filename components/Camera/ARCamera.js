// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";
import INatCamera from "../../INatCamera";

import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";

type Props = {
  navigation: any
}

class ARCamera extends Component<Props> {
  constructor() {
    super();

    this.state = {
      content: null,
      predictions: null,
      kingdom: null,
      phylum: null,
      class: null,
      order: null,
      family: null,
      genus: null,
      species: null
    };
  }

  requestPermissions = async () => {
    const retrieve = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    try {
      const granted = await PermissionsAndroid.request( retrieve );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        console.log( granted, "granted" );
      } else {
        console.log( "permission denied" );
        // this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      console.log( err, "permission denied" );
      // this.showError( err );
    }
  }

  onTaxaDetected = event => {
    let predictions = Object.assign( {}, event.nativeEvent );
    // console.log( predictions, "predictions" );

    this.setState( previousState => (
      { content: JSON.stringify( predictions ) }
    ) );
    
    this.setState( predictions );

    if ( predictions.kingdom ) {
      this.setState( { kingdom: predictions.kingdom } );
      console.log( "kingdom" );
    } else if ( predictions.phylum ) {
      this.setState( { phylum: predictions.phylum } );
      console.log( "phylum" )
    } else if ( predictions.class ) {
      this.setState( { class: predictions.class } );
      console.log( "class" )
    } else if ( predictions.order ) {
      this.setState( { order: predictions.order } );
      console.log( "order" )
    } else if ( predictions.family ) {
      this.setState( { family: predictions.family } );
      console.log( "family" )
    } else if ( predictions.genus ) {
      this.setState( { genus: predictions.genus } );
      console.log( "genus" )
    } else if ( predictions.species ) {
      this.setState( { species: predictions.species } );
      console.log( "species" )
    }
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

  render() {
    const { species } = this.state;
    const { navigation } = this.props;

    // let dots;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.requestPermissions()} />
        <View style={styles.header}>
          {species ? (
            <View>
              <View style={styles.greenButton}>
                <Text style={styles.greenButtonText}>
                  {species[0].score}
                </Text>
              </View>
              <Text style={styles.predictions}>{species[0].name}</Text>
            </View>
          ) : null}
          <View style={styles.dotRow}>
            <View style={styles.whiteDot} />
            <View style={styles.whiteDot} />
            <View style={styles.whiteDot} />
            <View style={styles.whiteDot} />
            <View style={styles.whiteDot} />
            <View style={styles.whiteDot} />
            <View style={styles.greenDot} />
          </View>
        </View>
        <INatCamera
          onTaxaDetected={this.onTaxaDetected}
          onCameraError={this.onCameraError}
          onCameraPermissionMissing={this.onCameraPermissionMissing}
          onClassifierError={this.onClassifierError}
          onDeviceNotSupported={this.onDeviceNotSupported}
          modelPath="/sdcard/Download/optimized_model.tflite"
          taxonomyPath="/sdcard/Download/taxonomy_data.csv"
          taxaDetectionInterval="5000"
          style={styles.camera}
        />
        <Text style={styles.scanText}>{i18n.t( "camera.scan" )}</Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.shutter}
          >
            {species
              ? <Image source={icons.arCameraGreen} />
              : <Image source={icons.arCameraButton} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate( "CameraHelp" )}
            style={styles.help}
          >
            <Image source={icons.cameraHelp} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ARCamera;
