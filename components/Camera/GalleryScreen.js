// @flow

import React, { Component } from "react";
import {
  CameraRoll, Dimensions, Image, ImageBackground, ScrollView, TouchableHighlight, View
} from "react-native";
import LoadingScreen from "../LoadingScreen";

import styles from "../../styles/gallery";

const { width } = Dimensions.get( "window" );

type Props = {
  navigation: any
}

class GalleryScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      photos: [],
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

  renderGallery( photos ) {
    const {
      navigation
    } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          photos.map( ( p, i ) => {
            return (
              <TouchableHighlight
                style={styles.button}
                key={i.toString()}
                underlayColor="transparent"
                onPress={() => navigation.navigate( "Results" )}
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
    )
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
