// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import RNFetchBlob from "rn-fetch-blob";
import ImageResizer from "react-native-image-resizer";

import config from "../../config";
import styles from "../../styles/results";

const { Blob } = RNFetchBlob.polyfill;
const { fs, wrap } = RNFetchBlob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

type Props = {
  navigation: any
}

class ChallengeResults extends Component {
  constructor( { navigation }: Props ) {
    super();

    const {
      image,
      time,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      headerText: "It's a match",
      text: "You saw a California Poppy",
      buttonText: "Add to collection",
      taxon: null,
      match: false,
      image,
      time,
      latitude,
      longitude
    };
  }

  componentDidMount() {
    this.scoreImage();
  }

  resizeImage() {
    const {
      image,
      time,
      latitude,
      longitude
    } = this.state;
    // console.log( image.uri, "original image uri")
    ImageResizer.createResizedImage( image.uri, 299, 299, "JPEG", 1 )
      .then( ( res ) => {
        console.log( res.uri, "new uri" );
        const { uri } = res;
        const uriParts = uri.split( "." );
        const fileType = uriParts[uriParts.length - 1];
        const params = {
          image: {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          }
        };

        console.log( params );

        fs.readFile( uri, "base64" )
          .then( ( data ) => {
            const blob = new Blob( data, { type: "image/jpg" } );

            const params = {
              image: blob,
              lat: latitude,
              lng: longitude,
              observed_on: time
            };
            console.log( params, "params with blob" );
            this.fetchScore( params );
          } ).catch( ( err ) => {
            console.log( err, "reading file" );
          } );
      } )
      .catch( ( err ) => {
        console.log( err, "error with image resizer" );
      } );
  }

  createJwtToken() {
    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    return token;
  }

  scoreImage() {
    const {
      uri,
      time,
      latitude,
      longitude
    } = this.state;

    this.resizeImage();

    // const uriParts = uri.split( "." );
    // const fileType = uriParts[uriParts.length - 1];
    // const params = {
    //   image: {
    //     uri,
    //     name: `photo.${fileType}`,
    //     type: `image/${fileType}`,
    //   }
    // };

    // console.log( params );

    // fs.readFile( uri, "base64" )
    //   .then( ( data ) => {
    //     const blob = new Blob( data, { type: "image/jpg" } );

    //     const params = {
    //       image: blob,
    //       lat: latitude,
    //       lng: longitude,
    //       observed_on: time
    //     };
    //     console.log( params, "params with blob" );
    //     this.fetchScore( params );
    //   } ).catch( ( err ) => {
    //     console.log( err, "reading file" );
    //   } );
  }

  fetchScore( params ) {
    const token = this.createJwtToken();

    inatjs.computervision.score_image( params, { api_token: token } )
      .then( ( results ) => {
        console.log(results, 'computer vision results');
      } )
      .catch( ( err ) => {
        console.log(err.response, 'computer vision error');
      } );
  }

  render() {
    const { headerText, text, buttonText } = this.state;

    return (
      <View style={ { flex: 1 } }>
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require( "../../assets/backgrounds/background.png" )}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>{headerText}</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
            <View>
              <TouchableHighlight style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => console.log( "pressed button" )}
                >
                  {buttonText}
                </Text>
              </TouchableHighlight>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default ChallengeResults;
