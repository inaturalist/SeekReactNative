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
  SafeAreaView,
  Dimensions
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import moment from "moment";
import GalleryManager from "react-native-gallery-manager";

import i18n from "../../i18n";
import PermissionError from "./PermissionError";
import LoadingWheel from "../UIComponents/LoadingWheel";
import {
  checkCameraRollPermissions,
  checkForPhotoMetaData,
  movePhotoToAppStorage,
  resizeImage
} from "../../utility/photoHelpers";
import styles from "../../styles/camera/gallery";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import { dirPictures } from "../../utility/dirStorage";
import AlbumPicker from "./AlbumPicker";

const { width } = Dimensions.get( "window" );

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
      albumNames: [],
      album: null
    };

    this.updateAlbum = this.updateAlbum.bind( this );
  }

  async setupComponent() {
    await this.getAlbumNames();
  }

  getAlbumNames() {
    const albumNames = [{
      label: i18n.t( "gallery.camera_roll" ),
      value: "All"
    }];

    GalleryManager.getAlbums().then( ( { albums } ) => {
      albums.forEach( ( album ) => {
        const { assetCount, title } = album;

        if ( assetCount > 0 ) {
          albumNames.push( {
            label: title,
            value: title
          } );
        }
      } );

      this.setState( { albumNames } );
    } ).catch( ( err ) => {
      if ( err ) {
        this.setState( { albumNames } ); // handle state where device has no albums on Android
      }
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
      first: 28,
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
      this.setState( {
        stillLoading: true
      } );
      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        this.appendPhotos( results.edges );
        this.setState( {
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

  updateAlbum( album ) {
    if ( album !== "All" ) {
      this.setState( {
        groupTypes: "Album",
        album
      }, () => this.resetState() );
    } else {
      this.setState( {
        groupTypes: "All",
        album: i18n.t( "gallery.camera_roll" )
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
      error: err || "Photo access permission denied"
    } );
  }

  navigateToResults( uri, time, location, backupUri ) {
    const { navigation } = this.props;

    let latitude = null;
    let longitude = null;

    if ( checkForPhotoMetaData( location ) ) {
      latitude = location.latitude;
      longitude = location.longitude;
    }

    navigation.navigate( "GalleryResults", {
      uri,
      time,
      latitude, // double check that this still works
      longitude,
      backupUri
    } );
  }

  selectAndResizeImage( node ) {
    const { timestamp, location, image } = node;

    resizeImage( image.uri, width, 250 ).then( ( resizedImage ) => {
      this.saveImageToAppDirectory( image.uri, resizedImage, node );
    } ).catch( () => {
      this.navigateToResults( image.uri, timestamp, location );
    } );
  }

  async saveImageToAppDirectory( uri, resizedImageUri, node ) {
    const { timestamp, location } = node;
    try {
      const newImageName = `${moment().format( "DDMMYY_HHmmSSS" )}.jpg`;
      const backupFilepath = `${dirPictures}/${newImageName}`;
      const imageMoved = await movePhotoToAppStorage( resizedImageUri, backupFilepath );

      if ( imageMoved ) {
        this.navigateToResults( uri, timestamp, location, backupFilepath );
      }
    } catch ( error ) {
      console.log( error, "error making backup" );
    }
  }

  render() {
    const {
      error,
      photos,
      albumNames
    } = this.state;

    const { navigation } = this.props;

    let gallery;

    if ( error ) {
      gallery = <PermissionError error={i18n.t( "camera.error_gallery" )} />;
    } else {
      gallery = (
        <FlatList
          data={photos}
          keyExtractor={( item, index ) => `${item}${index}`}
          ListEmptyComponent={() => (
            <View style={styles.loadingWheel}>
              <LoadingWheel color={colors.darkGray} />
            </View>
          )}
          numColumns={4}
          onEndReached={() => this.getPhotos()}
          renderItem={( { item } ) => (
            <TouchableHighlight
              onPress={() => this.selectAndResizeImage( item.node )}
              style={styles.button}
              underlayColor="transparent"
            >
              <Image
                source={{ uri: item.node.image.uri }}
                style={styles.image}
              />
            </TouchableHighlight>
          )}
        />
      );
    }

    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.safeViewTop} />
        <NavigationEvents
          onWillBlur={() => this.resetState()}
          onWillFocus={() => {
            this.setupComponent();
            this.checkPermissions();
          }}
        />
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            hitSlop={styles.touchable}
            onPress={() => navigation.navigate( "Main" )}
            style={styles.backButton}
          >
            <Image source={icons.closeGreen} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={[styles.center, styles.headerContainer]}>
            {albumNames.length > 0
              ? <AlbumPicker albums={albumNames} updateAlbum={this.updateAlbum} />
              : null}
          </View>
        </View>
        <View style={styles.galleryContainer}>
          {gallery}
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
