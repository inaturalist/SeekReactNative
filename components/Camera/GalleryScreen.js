// @flow

import React, { Component } from "react";
import {
  CameraRoll, Image, ImageBackground, ScrollView, TouchableHighlight, View
} from "react-native";
import LoadingScreen from "../LoadingScreen";

import styles from "../../styles/gallery";

type Props = {
  navigation: any
}

class GalleryScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      photos: [],
      imageClicked: null,
      loading: true,
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

  selectImage( image ) {
    const {
      navigation
    } = this.props;

    console.log( image, 'photo clicked' );
    this.setState( {
      imageClicked: image
    }, () => navigation.navigate( "Results", { image: this.state.imageClicked } ) );
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
                  this.selectImage( p.node.image );
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
      photos,
      loading
    } = this.state;

    const gallery = loading ? <LoadingScreen /> : this.renderGallery( photos );

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../../assets/backgrounds/background.png" )}
        >
          <View style={styles.gallery}>
            {gallery}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default GalleryScreen;
