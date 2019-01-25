// @flow

import React, { Component } from "react";
import {
  PermissionsAndroid,
  Platform,
  CameraRoll,
  Image,
  ScrollView,
  TouchableHighlight,
  View,
  StatusBar
} from "react-native";

import ErrorScreen from "../ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import { truncateCoordinates } from "../../utility/locationHelpers";
import styles from "../../styles/camera/gallery";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

class GalleryScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      latitude,
      longitude,
      commonName
    } = navigation.state.params;

    this.state = {
      photos: [],
      loading: true,
      latitude,
      longitude,
      id,
      commonName,
      error: null
    };
  }

  componentDidMount() {
    if ( Platform.OS === "android" ) {
      this.requestAndroidPermissions();
    } else {
      this.getPhotos();
    }
  }

  getPhotos() {
    CameraRoll.getPhotos( {
      first: 1000,
      assetType: "Photos"
    } ).then( ( results ) => {
      this.setState( {
        photos: results.edges,
        loading: false
      } );
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
  }

  requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.getPhotos();
      } else {
        this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      this.showError( err );
    }
  }

  showError( err ) {
    this.setState( {
      error: err || "Photo access permission denied",
      loading: false
    } );
  }

  selectImage( imageClicked, timestamp, location ) {
    const {
      id,
      latitude,
      longitude,
      commonName
    } = this.state;

    const {
      navigation
    } = this.props;

    if ( location ) {
      if ( Object.keys( location ).length !== 0 && location.latitude ) {
        const navParams = {
          id,
          image: imageClicked,
          time: timestamp,
          latitude: truncateCoordinates( location.latitude ),
          longitude: truncateCoordinates( location.longitude ),
          commonName
        };
        navigation.push( "Results", navParams );
      } else {
        const navParams = {
          id,
          image: imageClicked,
          time: timestamp,
          latitude,
          longitude,
          commonName
        };
        navigation.push( "Results", navParams );
      }
    } else {
      const navParams = {
        id,
        image: imageClicked,
        time: timestamp,
        latitude,
        longitude,
        commonName
      };
      navigation.push( "Results", navParams );
    }
  }

  render() {
    const { error, loading, photos } = this.state;

    let gallery;

    if ( error ) {
      gallery = <ErrorScreen error={error} collection />;
    } else if ( loading ) {
      gallery = <LoadingWheel color={colors.darkGray} />;
    } else {
      gallery = (
        <ScrollView contentContainerStyle={styles.container}>
          {
            photos.map( ( p, i ) => {
              return (
                <TouchableHighlight
                  style={styles.button}
                  key={i.toString()}
                  underlayColor="transparent"
                  onPress={() => {
                    this.selectImage( p.node.image, p.node.timestamp, p.node.location );
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: p.node.image.uri }}
                  />
                </TouchableHighlight>
              );
            } )
          }
        </ScrollView>
      );
    }

    return (
      <View style={styles.background}>
        <StatusBar hidden />
        <View style={styles.galleryContainer}>
          {gallery}
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
