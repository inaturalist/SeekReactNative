// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Text,
  Platform,
  NativeModules,
  Alert,
  CameraRoll
} from "react-native";
import { NavigationEvents } from "react-navigation";
import RNFS from "react-native-fs";

import INatCamera from "react-native-inat-camera";

import LoadingWheel from "../LoadingWheel";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";

type Props = {
  navigation: any
}

class ARCamera extends Component<Props> {
  constructor() {
    super();

    this.state = {
      ranks: {},
      rankToRender: null,
      loading: true,
      predictions: []
    };
  }

  setImagePredictions( predictions ) {
    this.setState( { predictions } );
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

  onTaxaDetected = ( event ) => {
    const predictions = Object.assign( {}, event.nativeEvent );

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
      this.setState( {
        ranks: {
          species: predictions.species
        },
        rankToRender: "species"
      } );
    }
  }

  onCameraError = ( event ) => {
    console.log( `Camera error: ${event.nativeEvent.error}` );
  }

  onCameraPermissionMissing = () => {
    console.log( "Missing camera permission" );
  }

  onClassifierError = ( event ) => {
    console.log( `Classifier error: ${event.nativeEvent.error}` );
  }

  onDeviceNotSupported = ( event ) => {
    console.log( `Device not supported, reason: ${event.nativeEvent.reason}` );
  }

  getCameraCaptureFromGallery() {
    CameraRoll.getPhotos( {
      first: 1,
      assetType: "Photos"
    } ).then( ( results ) => {
      const photo = results.edges[0].node;
      this.navigateToResults( photo );
    } ).catch( ( err ) => {
      console.log( err, "error getting photo from gallery" );
    } );
  }

  takePicture = async () => {
    this.setLoading( true );
    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync();
          Alert.alert( JSON.stringify( photo.predictions, "predict in AR CAM" ) );
          this.setImagePredictions( photo.predictions );
          this.savePhotoToGallery( photo );
        } catch ( e ) {
          console.log( "error taking picture ", e );
        }
      }
    }
  }

  savePhotoToGallery( photo ) {
    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery() )
      .catch( ( err ) => {
        console.log( err, "error getting photo from gallery" );
      } );
  }

  navigateToResults( photo ) {
    const { predictions } = this.state;
    const { navigation } = this.props;

    navigation.push( "Results", {
      image: photo.image,
      time: photo.timestamp,
      latitude: null,
      longitude: null,
      predictions
    } );
  }

  render() {
    const { ranks, rankToRender, loading } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.requestPermissions()} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        <ARCameraHeader
          ranks={ranks}
          rankToRender={rankToRender}
        />
        <Text style={styles.scanText}>{i18n.t( "camera.scan" )}</Text>
        <TouchableOpacity
          onPress={() => this.takePicture()}
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
          taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
          style={styles.camera}
        />
      </View>
    );
  }
}

export default ARCamera;
