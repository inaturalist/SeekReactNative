// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Platform,
  Text,
  TouchableHighlight
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";

import config from "../../config";
import styles from "../../styles/results";

// inatjs.setConfig( { apiURL: "https://stagingapi.inaturalist.org/v1" } );

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
      image,
      time,
      latitude,
      longitude
    };
  }

  componentDidMount() {
    console.log( this.state.image.uri, "original uri android" );
    this.resizeImage();
  }

  flattenUploadParameters( uri ) {
    const {
      time,
      latitude, // need to account for null case
      longitude // need to account for null case
    } = this.state;

    const UploadParams = class UploadParams {
      constructor( attrs ) {
        Object.assign( this, attrs );
      }
    };

    console.log( uri, "uri file type jpeg?" );

    const params = {
      image: new UploadParams( {
        uri,
        name: "photo.jpeg",
        type: "image/jpeg"
      } ),
      observed_on: new Date( time * 1000 ).toISOString(),
      latitude,
      longitude
    };

    return params;
  }

  resizeImage() {
    const {
      image
    } = this.state;

    ImageResizer.createResizedImage( image.uri, 299, 299, "JPEG", 100 )
      .then( ( { uri } ) => {
        let resizedImageUri;

        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          resizedImageUri = uriParts[uriParts.length - 1];
        } else {
          resizedImageUri = uri;
        }
        const params = this.flattenUploadParameters( resizedImageUri );
        this.fetchScore( params );
      } ).catch( ( err ) => {
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

  fetchScore( params ) {
    const token = this.createJwtToken();

    inatjs.computervision.score_image( params, { api_token: token } )
      .then( ( results ) => {
        console.log(results, 'computer vision results');
        // this.setState( {
        //   taxaName: results.
        // } );
      } )
      .catch( ( err ) => {
        console.log(err, 'error fetching results from computer vision');
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
