// @flow

import React, { Component } from "react";
import {
  Platform,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryContainer from "./GalleryContainer";

type Props = {}

type State = {
  photos: Array<Object>,
  error: ?string,
  hasNextPage: boolean,
  lastCursor: null,
  stillLoading: boolean,
  groupTypes: string,
  album: ?string
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
      album: null
    };

    ( this:any ).updateAlbum = this.updateAlbum.bind( this );
    ( this:any ).setPhotoParams = this.setPhotoParams.bind( this );
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

  render() {
    const {
      error,
      photos
    } = this.state;

    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.safeViewTop} />
        <NavigationEvents
          onWillFocus={() => this.checkPermissions()}
        />
        <StatusBar barStyle="dark-content" />
        <GalleryHeader updateAlbum={this.updateAlbum} />
        <GalleryContainer
          setPhotoParams={this.setPhotoParams}
          error={error}
          photos={photos}
        />
      </View>
    );
  }
}

export default GalleryScreen;
