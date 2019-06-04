// @flow

import React, { Component } from "react";
import {
  Platform,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import ErrorScreen from "./ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import { checkCameraRollPermissions, checkForPhotoMetaData } from "../../utility/photoHelpers";
import { getLatAndLng } from "../../utility/locationHelpers";
import styles from "../../styles/camera/gallery";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";

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
      assetType: "Photos",
      groupTypes: "All" // this is required in RN 0.59+
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
    const permission = await checkCameraRollPermissions();
    if ( permission === true ) {
      this.getPhotos();
    } else {
      this.showError( permission );
    }
  }

  resetState() {
    this.setState( {
      photos: [],
      loading: true,
      error: null,
      hasNextPage: true,
      lastCursor: null,
      stillLoading: false
    } );
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

  navigateToResults( image, time, latitude, longitude ) {
    const { navigation } = this.props;

    navigation.navigate( "Results", {
      image,
      time,
      latitude,
      longitude,
      predictions: []
    } );
  }

  async selectImage( node ) {
    const { timestamp, location, image } = node;
    const userLocation = await getLatAndLng();

    if ( checkForPhotoMetaData( location ) ) {
      this.navigateToResults( image, timestamp, location.latitude, location.longitude );
    } else {
      this.navigateToResults( image, timestamp, userLocation.latitude, userLocation.longitude );
    }
  }

  render() {
    const {
      error,
      loading,
      photos
    } = this.state;

    const { navigation } = this.props;

    let gallery;

    if ( error ) {
      gallery = <ErrorScreen error={i18n.t( "camera.error_gallery" )} />;
    } else if ( loading ) {
      gallery = (
        <View style={styles.loadingWheel}>
          <LoadingWheel color={colors.darkGray} />
        </View>
      );
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
                onPress={() => this.selectImage( p.node )}
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
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => this.checkPermissions()}
            onWillBlur={() => this.resetState()}
          />
          <StatusBar barStyle="dark-content" />
          <View style={styles.header}>
            <TouchableOpacity
              hitSlop={styles.touchable}
              style={styles.backButton}
              onPress={() => navigation.navigate( "Main" )}
            >
              <Image source={icons.closeGreen} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{i18n.t( "gallery.choose_photo" ).toLocaleUpperCase()}</Text>
          </View>
          <View style={styles.galleryContainer}>
            {gallery}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default GalleryScreen;
