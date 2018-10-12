import React, { Component } from "react";
import {
  CameraRoll, Dimensions, Image, ScrollView, TouchableHighlight
} from "react-native";

const { width } = Dimensions.get( "window" );

class GalleryScreen extends Component {
  constructor() {
    super();

    this.state = {
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
        photos: results.edges
      } );
      console.log(results.edges, "photos");
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
  }

  render() {
    const {
      photos,
      index
    } = this.state;

    return (
      <ScrollView>
        {
          photos.map( ( p, i ) => {
            return (
              <TouchableHighlight
                key={i.toString()}
                underlayColor="transparent"
                onPress={() => console.log( "clicked image" )}
              >
                <Image
                  style={{
                    width: width / 3,
                    height: width / 3
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              </TouchableHighlight>
            );
          } )
        }
      </ScrollView>
    );
  }
}

export default GalleryScreen;
