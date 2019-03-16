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
import RNFS from "react-native-fs";

import INatCamera from "react-native-inat-camera";
import LoadingWheel from "../LoadingWheel";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import rankDict from "../../utility/rankDict";

type Props = {
  navigation: any
}

class ARCamera extends Component<Props> {
  constructor() {
    super();

    this.state = {
      ranks: {},
      rankToRender: null,
      loading: true
    };
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  requestPermissions = async () => {
    const camera = PermissionsAndroid.PERMISSIONS.CAMERA;

    try {
      const granted = await PermissionsAndroid.request( camera );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        // console.log( granted, "granted" );
      } else {
        // console.log( "permission denied" );
      }
    } catch ( err ) {
      // console.log( err, "permission denied" );
    }
  }

  onTaxaDetected = event => {
    let predictions = Object.assign( {}, event.nativeEvent );
    // console.log( predictions, "predictions" );

    if ( predictions ) {
      this.setLoading( false );
    }

    if ( predictions.kingdom ) {
      this.setState( { 
        ranks: {
          kingdom: predictions.kingdom
        },
        rankToRender: "kingdom"
       } );
    } else if ( predictions.phylum ) {
      this.setState( { 
        ranks: {
          phylum: predictions.phylum
        },
        rankToRender: "phylum"
       } );
    } else if ( predictions.class ) {
      this.setState( { 
        ranks: {
          class: predictions.class
        },
        rankToRender: "class"
       } );
    } else if ( predictions.order ) {
      this.setState( { 
        ranks: {
          order: predictions.order
        },
        rankToRender: "order"
       } );
    } else if ( predictions.family ) {
      this.setState( { 
        ranks: {
          family: predictions.family
        },
        rankToRender: "family"
       } );
    } else if ( predictions.genus ) {
      this.setState( { 
        ranks: {
          genus: predictions.genus
        },
        rankToRender: "genus"
       } );
    } else if ( predictions.species ) {
      // {console.log( predictions.species[0].name, "predictions" )}
      this.setState( { 
        ranks: {
          species: predictions.species
        },
        rankToRender: "species"
       } );
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
    const { ranks, rankToRender, loading } = this.state;
    const { navigation } = this.props;

    // console.log( rankToRender, "rank to render" );

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.requestPermissions()} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        <View style={styles.header}>
          {rankToRender ? (
            <View style={styles.greenButton}>
              <Text style={styles.greenButtonText}>
                {i18n.t( rankDict[rankToRender] ).toLocaleUpperCase()}
              </Text>
            </View>
          ) : null}
          {rankToRender ? (
            <Text style={styles.predictions}>
              {ranks[rankToRender][0].name}
              {/* {console.log( ranks[rankToRender][0].name )} */}
            </Text>
          ) : null}
          {ranks && rankToRender ? (
            <View style={styles.dotRow}>
              <View style={ranks.kingdom ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.phylum ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.class ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.order ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.family ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.genus ? styles.greenDot : styles.whiteDot} />
              <View style={ranks.species ? styles.greenDot : styles.whiteDot} />
            </View>
          ) : null}
        </View>
        <Text style={styles.scanText}>{i18n.t( "camera.scan" )}</Text>
        <TouchableOpacity
          onPress={() => console.log( "clicked shutter button" )}
          style={styles.shutter}
        >
          {ranks && ranks.species
            ? <Image source={icons.arCameraGreen} />
            : <Image source={icons.arCameraButton} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "CameraHelp" )}
          style={styles.help}
        >
          <Image source={icons.cameraHelp} />
        </TouchableOpacity>
        { loading ? (
          <View style={styles.loading}>
            <LoadingWheel color="white" />
          </View>
        ) : null}
        <INatCamera
          onTaxaDetected={this.onTaxaDetected}
          onCameraError={this.onCameraError}
          onCameraPermissionMissing={this.onCameraPermissionMissing}
          onClassifierError={this.onClassifierError}
          onDeviceNotSupported={this.onDeviceNotSupported}
          modelPath={`${RNFS.DocumentDirectoryPath}/optimized-model.tflite`}
          taxonomyPath={`${RNFS.DocumentDirectoryPath}/taxonomy_data.csv`}
          taxaDetectionInterval="80"
          style={styles.camera}
        />
      </View>
    );
  }
}

export default ARCamera;
