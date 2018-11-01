// @flow

import React, { Component } from "react";
import {
  CameraRoll,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  View
} from "react-native";
import LoadingScreen from "../LoadingScreen";
import NavBar from "../NavBar";

import styles from "../../styles/gallery";

type Props = {
  navigation: any
}

class GalleryScreen extends Component {
  constructor( { navigation }: Props ) {
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
      console.log( results.page_info, "page" );
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

  truncateCoordinates( coordinate ) {
    return Number( coordinate.toFixed( 2 ) );
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
      imageLatitude: location.latitude ? this.truncateCoordinates( location.latitude ) : null,
      imageLongitude: location.longitude ? this.truncateCoordinates( location.longitude ) : null
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
      photos,
      loading
    } = this.state;

    const {
      navigation
    } = this.props;

    const gallery = loading ? <LoadingScreen /> : this.renderGallery( photos );

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../../assets/backgrounds/background.png" )}
        >
          <NavBar navigation={navigation} />
          <View style={styles.gallery}>
            {gallery}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default GalleryScreen;
