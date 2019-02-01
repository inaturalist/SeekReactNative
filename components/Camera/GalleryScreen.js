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
import { NavigationEvents } from "react-navigation";

import ErrorScreen from "../ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import { truncateCoordinates, getLatAndLng } from "../../utility/locationHelpers";
import styles from "../../styles/camera/gallery";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

class GalleryScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      photos: [],
      loading: true,
      error: null,
      hasNextPage: true,
      lastCursor: null,
      stillLoading: false
    };
  }

  getPhotos() {
    const { lastCursor, hasNextPage, stillLoading } = this.state;

    const photoOptions = {
      first: 28,
      assetType: "Photos"
    };

    if ( lastCursor ) {
      photoOptions.after = lastCursor;
    }

    if ( hasNextPage && !stillLoading ) {
      this.setState( {
        stillLoading: true
      } );
      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        this.appendPhotos( results.edges );
        this.setState( {
          loading: false,
          hasNextPage: results.page_info.has_next_page,
          lastCursor: results.page_info.end_cursor
        } );
      } ).catch( ( err ) => {
        this.setState( {
          error: err.message
        } );
      } );
    }
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

  appendPhotos( data ) {
    const { photos } = this.state;

    if ( photos.length > 0 ) {
      data.forEach( ( photo ) => {
        photos.push( photo );
      } );
      this.setState( {
        photos,
        stillLoading: false
      } );
    } else {
      this.setState( {
        photos: data,
        stillLoading: false
      } );
    }
  }

  checkPermissions() {
    if ( Platform.OS === "android" ) {
      this.requestAndroidPermissions();
    } else {
      this.getPhotos();
    }
  }

  showError( err ) {
    this.setState( {
      error: err || "Photo access permission denied",
      loading: false
    } );
  }

  async selectImage( imageClicked, timestamp, location ) {
    const { navigation } = this.props;
    const userLocation = await getLatAndLng();

    if ( location ) {
      if ( Object.keys( location ).length !== 0 && location.latitude ) {
        navigation.push( "Results", {
          image: imageClicked,
          time: timestamp,
          latitude: truncateCoordinates( location.latitude ),
          longitude: truncateCoordinates( location.longitude )
        } );
      } else {
        navigation.push( "Results", {
          image: imageClicked,
          time: timestamp,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        } );
      }
    } else {
      navigation.push( "Results", {
        image: imageClicked,
        time: timestamp,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      } );
    }
  }

  render() {
    const {
      error,
      loading,
      photos
    } = this.state;

    let gallery;

    if ( error ) {
      gallery = <ErrorScreen error={error} collection />;
    } else if ( loading ) {
      gallery = <LoadingWheel color={colors.darkGray} />;
    } else {
      gallery = (
        <ScrollView
          contentContainerStyle={styles.container}
          onScroll={() => this.getPhotos()}
        >
          {photos.map( ( p, i ) => {
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
          } )}
        </ScrollView>
      );
    }

    return (
      <View style={styles.background}>
        <NavigationEvents
          onWillFocus={() => this.checkPermissions()}
        />
        <StatusBar hidden />
        <View style={styles.galleryContainer}>
          {gallery}
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
