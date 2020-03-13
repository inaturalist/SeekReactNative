// @flow

import React, { Component } from "react";
import {
  Platform,
  Image,
  TouchableHighlight,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import { getPredictionsForImage } from "react-native-inat-camera";

import { checkForPhotoMetaData, getAlbumNames } from "../../../utility/photoHelpers";
import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import GalleryHeader from "./GalleryHeader";
import GalleryContainer from "./GalleryContainer";

type Props = {
  +navigation: any
}

type State = {
  photos: Array<Object>,
  error: ?string,
  hasNextPage: boolean,
  lastCursor: null,
  stillLoading: boolean,
  groupTypes: string,
  album: ?string,
  loading: boolean,
  albumNames: Array<String>
}

class GalleryScreen extends Component<Props, State> {
  camera: ?any

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

    ( this:any ).updateAlbum = this.updateAlbum.bind( this );
    ( this:any ).setPhotoParams = this.setPhotoParams.bind( this );
    ( this:any ).selectAndResizeImage = this.selectAndResizeImage.bind( this );
  }

  getPredictions( uri: string, timestamp: Date, location: string ) {
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

  setPhotoParams() {
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
      // $FlowFixMe
      photoOptions.groupName = album;
    }

    if ( lastCursor ) {
      // $FlowFixMe
      photoOptions.after = lastCursor;
    }

    if ( hasNextPage && !stillLoading ) {
      this.setState( {
        stillLoading: true
      }, () => this.getPhotos( photoOptions ) );
    }
  }

  getPhotos( photoOptions: Object ) {
    // $FlowFixMe
    CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
      this.appendPhotos( results.edges, results.page_info );
    } ).catch( ( err ) => {
      console.log( err, "error" );
    } );
  }

  setError( error: string ) {
    this.setState( { error } );
  }

  requestAndroidPermissions = async () => {
    const permission = await checkCameraRollPermissions();
    if ( permission === true ) {
      this.setPhotoParams();
    } else {
      this.setError( "gallery" );
    }
  }

  updateAlbum( album: string ) {
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
    }, () => this.setPhotoParams() );
  }

  updatePhotos( photos: Array<Object>, pageInfo: Object ) {
    this.setState( {
      photos,
      stillLoading: false,
      hasNextPage: pageInfo.has_next_page,
      lastCursor: pageInfo.end_cursor
    } );
  }

  appendPhotos( data: Array<Object>, pageInfo: Object ) {
    const { photos } = this.state;

    if ( photos.length === 0 && data.length === 0 && pageInfo.has_next_page === false ) {
      this.setError( "photos" );
    } else if ( photos.length > 0 ) {
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
      this.setPhotoParams();
    }
  }

  navigateToResults( uri: string, time: Date, location: Object, predictions: ?Array<Object> ) {
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
      // $FlowFixMe
      results.predictions = predictions;

      navigation.navigate( "OfflineARResults", results );
    } else {
      navigation.navigate( "OnlineServerResults", results );
    }
  }

  selectAndResizeImage( node: Object ) {
    const { timestamp, location, image } = node;

    this.setState( { loading: true } );

    if ( Platform.OS === "android" ) {
      this.getPredictions( image.uri, timestamp, location );
    } else {
      this.navigateToResults( image.uri, timestamp, location );
    }
  }

  renderItem = ( { item }: Object ) => (
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
        <GalleryHeader albumNames={albumNames} updateAlbum={this.updateAlbum} />
        <GalleryContainer
          setPhotoParams={this.setPhotoParams}
          selectAndResizeImage={this.selectAndResizeImage}
          error={error}
          loading={loading}
          photos={photos}
        />
      </View>
    );
  }
}

export default GalleryScreen;
