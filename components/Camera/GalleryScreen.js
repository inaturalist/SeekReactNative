// @flow

import React, { Component } from "react";
import {
  CameraRoll,
  Image,
  ScrollView,
  TouchableHighlight,
  View
} from "react-native";

import CameraTopNav from "./CameraTopNav";
import CameraBottomNav from "./CameraBottomNav";
import LoadingWheel from "../LoadingWheel";
import styles from "../../styles/gallery";
import { truncateCoordinates } from "../../utility/helpers";

type Props = {
  navigation: any,
  toggleActiveLink: Function,
  camera: boolean
}

class GalleryScreen extends Component {
  constructor( {
    navigation,
    toggleActiveLink,
    camera
  }: Props ) {
    super();

    const { id } = navigation.state.params;

    this.state = {
      id,
      imageClicked: null,
      imageTimestamp: null,
      imageLatitude: null,
      imageLongitude: null,
      loading: true,
      photos: [],
      error: null
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
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

  selectImage( image, time, location ) {
    // remember to deal with error state -> what happens if photo location undefined?
    const {
      id
    } = this.state;

    const {
      navigation
    } = this.props;

    this.setState( {
      imageClicked: image,
      imageTimestamp: time,
      imageLatitude: location.latitude ? truncateCoordinates( location.latitude ) : null,
      imageLongitude: location.longitude ? truncateCoordinates( location.longitude ) : null
    }, () => navigation.navigate( "Results", {
      id,
      image: this.state.imageClicked,
      time: this.state.imageTimestamp,
      latitude: this.state.imageLatitude,
      longitude: this.state.imageLongitude
    } ) );
  }

  renderGallery( photos ) {
    return (
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

  render() {
    const {
      id,
      photos,
      loading
    } = this.state;

    const {
      navigation,
      camera,
      toggleActiveLink
    } = this.props;

    const gallery = loading ? <LoadingWheel /> : this.renderGallery( photos );

    return (
      <View style={styles.background}>
        <CameraTopNav
          camera={camera}
          navigation={navigation}
        />
        <View style={styles.gallery}>
          {gallery}
        </View>
        <CameraBottomNav
          navigation={navigation}
          id={id}
          camera={camera}
          toggleActiveLink={toggleActiveLink}
        />
      </View>
    );
  }
}

export default GalleryScreen;
