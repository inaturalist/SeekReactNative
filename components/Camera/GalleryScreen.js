// @flow

import React, { Component } from "react";
import {
  Platform,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import { getPredictionsForImage } from "react-native-inat-camera";

import i18n from "../../i18n";
import CameraError from "./CameraError";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { checkForPhotoMetaData, getAlbumNames } from "../../utility/photoHelpers";
import { checkCameraRollPermissions } from "../../utility/androidHelpers.android";
import styles from "../../styles/camera/gallery";
import { colors, dimensions } from "../../styles/global";
import icons from "../../assets/icons";
import { dirTaxonomy, dirModel } from "../../utility/dirStorage";
import AlbumPicker from "./AlbumPicker";

type Props = {
  +navigation: any
}

class GalleryScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      photos: [],
      error: null,
      hasNextPage: true,
      lastCursor: null,
      stillLoading: false,
      groupTypes: "All",
      album: null,
      loading: false,
      albumNames: []
    };

    this.updateAlbum = this.updateAlbum.bind( this );
  }

  getPredictions( uri, timestamp, location ) {
    const path = uri.split( "file://" );
    const reactUri = path[1];

    getPredictionsForImage( {
      uri: reactUri,
      modelFilename: dirModel,
      taxonomyFilename: dirTaxonomy
    } ).then( ( { predictions } ) => {
      this.navigateToResults( uri, timestamp, location, predictions );
    } ).catch( ( err ) => {
      console.log( "Error", err );
    } );
  }

  getPhotos() {
    const {
      lastCursor,
      hasNextPage,
      stillLoading,
      groupTypes,
      album
    } = this.state;

    const photoOptions = {
      first: 50,
      assetType: "Photos",
      groupTypes // this is required in RN 0.59+
    };

    if ( album ) { // append for cases where album is null
      photoOptions.groupName = album;
    }

    if ( lastCursor ) {
      photoOptions.after = lastCursor;
    }

    if ( hasNextPage && !stillLoading ) {
      this.setState( { stillLoading: true } );
      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        this.appendPhotos( results.edges, results.page_info );
      } ).catch( ( err ) => {
        console.log( err, "error" );
      } );
    }
  }

  setError( error ) {
    this.setState( { error } );
  }

  requestAndroidPermissions = async () => {
    const permission = await checkCameraRollPermissions();
    if ( permission === true ) {
      this.getPhotos();
    } else {
      this.setError( "gallery" );
    }
  }

  updateAlbum( album ) {
    if ( album !== "All" ) {
      this.setState( {
        groupTypes: "Album",
        album
      }, () => this.resetState() );
    } else {
      this.setState( {
        groupTypes: "All",
        album: null
      }, () => this.resetState() );
    }
  }

  resetState() {
    this.setState( {
      photos: [],
      error: null,
      hasNextPage: true,
      lastCursor: null,
      stillLoading: false
    }, () => this.getPhotos() );
  }

  updatePhotos( photos, pageInfo ) {
    this.setState( {
      photos,
      stillLoading: false,
      hasNextPage: pageInfo.has_next_page,
      lastCursor: pageInfo.end_cursor
    } );
  }

  appendPhotos( data, pageInfo ) {
    const { photos } = this.state;

    if ( photos.length === 0 && data.length === 0 ) {
      this.setError( "noPhotos" );
    }

    if ( photos.length > 0 ) {
      data.forEach( ( photo ) => {
        photos.push( photo );
      } );
      this.updatePhotos( photos, pageInfo );
    } else {
      this.updatePhotos( data, pageInfo );
    }
  }

  checkPermissions() {
    if ( Platform.OS === "android" ) {
      this.requestAndroidPermissions();
    } else {
      this.getPhotos();
    }
  }

  navigateToResults( uri, time, location, predictions ) {
    const { navigation } = this.props;

    let latitude = null;
    let longitude = null;

    if ( checkForPhotoMetaData( location ) ) {
      latitude = location.latitude;
      longitude = location.longitude;
    }

    this.setState( { loading: false } );

    const results = {
      time,
      uri,
      latitude,
      longitude
    };

    if ( predictions && predictions.length > 0 ) {
      results.predictions = predictions;

      navigation.navigate( "OfflineARResults", results );
    } else {
      navigation.navigate( "OnlineServerResults", results );
    }
  }

  selectAndResizeImage( node ) {
    const { timestamp, location, image } = node;

    this.setState( { loading: true } );

    if ( Platform.OS === "android" ) {
      this.getPredictions( image.uri, timestamp, location );
    } else {
      this.navigateToResults( image.uri, timestamp, location );
    }
  }

  renderItem = ( { item } ) => (
    <TouchableHighlight
      accessibilityLabel={item.node.image.filename}
      accessible
      onPress={() => this.selectAndResizeImage( item.node )}
      style={styles.button}
      underlayColor="transparent"
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.image}
      />
    </TouchableHighlight>
  );

  async fetchAlbumNames() {
    const albumNames = await getAlbumNames();
    this.setState( { albumNames } );
  }

  render() {
    const {
      error,
      photos,
      loading,
      albumNames
    } = this.state;

    const { navigation } = this.props;

    let gallery;

    if ( error ) {
      gallery = <CameraError error={error} />;
    } else {
      gallery = (
        <FlatList
          data={photos}
          getItemLayout={( data, index ) => (
            // skips measurement of dynamic content for faster loading
            {
              length: ( dimensions.width / 4 - 2 ),
              offset: ( dimensions.width / 4 - 2 ) * index,
              index
            }
          )}
          initialNumToRender={20}
          keyExtractor={( item, index ) => `${item}${index}`}
          ListEmptyComponent={() => (
            <View style={styles.loadingWheel}>
              <LoadingWheel color={colors.darkGray} />
            </View>
          )}
          numColumns={4}
          onEndReached={() => this.getPhotos()}
          renderItem={this.renderItem}
        />
      );
    }

    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.safeViewTop} />
        <NavigationEvents
          onWillFocus={() => {
            this.checkPermissions();
            this.fetchAlbumNames();
          }}
        />
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.back" )}
            accessible
            onPress={() => navigation.navigate( "Main" )}
            style={styles.backButton}
          >
            <Image source={icons.closeGreen} style={styles.buttonImage} />
          </TouchableOpacity>
          {albumNames.length > 0 ? (
            <View style={[styles.center, styles.headerContainer]}>
              <AlbumPicker albumNames={albumNames} updateAlbum={this.updateAlbum} />
            </View>
          ) : null}
        </View>
        {loading ? (
          <View style={styles.loading}>
            <LoadingWheel color={colors.darkGray} />
          </View>
        ) : null}
        <View style={styles.galleryContainer}>
          {gallery}
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
