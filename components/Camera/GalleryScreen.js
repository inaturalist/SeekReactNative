// @flow

import React, { Component } from "react";
import {
  CameraRoll,
  Image,
  ScrollView,
  TouchableHighlight,
  View
} from "react-native";

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

    const { id, latitude, longitude, commonName } = navigation.state.params;

    this.state = {
      photos: [],
      loading: true,
      latitude,
      longitude,
      time: null,
      id,
      commonName
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

    this.setState( {
      image: imageClicked,
      time: timestamp,
      latitude: location.latitude ? truncateCoordinates( location.latitude ) : latitude,
      longitude: location.longitude ? truncateCoordinates( location.longitude ) : longitude
    }, () => navigation.navigate( "Results", {
      id,
      image: this.state.image,
      time: this.state.time,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      commonName
    } ) );
  }

  render() {
    const { loading, photos } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.background}>
        <View style={styles.navbar}>
          <CameraTopNav navigation={navigation} />
        </View>
        <View style={styles.galleryContainer}>
          {loading ? <LoadingWheel color={colors.darkGray} /> : (
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
          ) }
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
