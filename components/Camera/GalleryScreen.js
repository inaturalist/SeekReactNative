// @flow

import React, { Component } from "react";
import {
  PermissionsAndroid,
  Platform,
  CameraRoll,
  Image,
  ScrollView,
  TouchableHighlight,
  View
} from "react-native";

import ErrorScreen from "../ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import CameraTopNav from "./CameraTopNav";
import { truncateCoordinates } from "../../utility/helpers";
import styles from "../../styles/gallery";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

class GalleryScreen extends Component {
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
      time: null,
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
      first: 100,
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
    // remember to deal with error state -> what happens if photo location undefined?
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
      if ( location.latitude ) {
        this.setState( {
          image: imageClicked,
          time: timestamp,
          latitude: truncateCoordinates( location.latitude ),
          longitude: truncateCoordinates( location.longitude )
        }, () => navigation.push( "Results", {
          id,
          image: this.state.image,
          time: this.state.time,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          commonName
        } ) );
      }
    }
    this.setState( {
      image: imageClicked,
      time: timestamp
    }, () => navigation.push( "Results", {
      id,
      image: this.state.image,
      time: this.state.time,
      latitude,
      longitude,
      commonName
    } ) );
  }

  render() {
    const { error, loading, photos } = this.state;
    const { navigation } = this.props;

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
        <View style={styles.navbar}>
          <CameraTopNav navigation={navigation} />
        </View>
        <View style={styles.galleryContainer}>
          {gallery}
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
