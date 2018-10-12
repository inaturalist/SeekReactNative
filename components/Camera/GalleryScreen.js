import React, { Component } from "react";
import {
  CameraRoll, Dimensions, Image, ScrollView, TouchableHighlight, View
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
      photos
    } = this.state;

    return (
      <View style={{
        flex: 1
      }}
      >
        <View style={{ paddingTop: 20, flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}>
            {
              photos.map( ( p, i ) => {
                return (
                  <TouchableHighlight
                    style={{ paddingHorizontal: 1, paddingTop: 2 }}
                    key={i.toString()}
                    underlayColor="transparent"
                    onPress={() => console.log( "clicked image" )}
                  >
                    <Image
                      style={{
                        width: width / 4 - 2,
                        height: width / 4 - 2
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableHighlight>
                );
              } )
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default GalleryScreen;
