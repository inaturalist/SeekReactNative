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

import config from "../../config";
import styles from "../../styles/results";

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
    this.resizeImage();
  }

  resizeImage() {
    const { image } = this.state;
    image.height = 299;
    image.width = 299;

    this.setState( {
      image
    } );
  }

  splitUri( uri ) {
    const uriParts = uri.split( "." );
    const fileType = uriParts[uriParts.length - 1];
    const params = {
      image: {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      }
    };
    return params;
  }

  scoreImage() {
    const { image } = this.state;
    // const { time, latitude, longitude } = this.state;

    // const params = {
    //   lat: latitude,
    //   lng: longitude,
    //   observed_on: time
    // };

    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const params = this.splitUri( image.uri );
    const token = jwt.encode( claims, config.jwtSecret, "HS512" );

    inatjs.computervision.score_image( params, { api_token: token } )
      .then( ( results ) => {
        console.log(results, 'computer vision scoring');
      } )
      .catch( ( err ) => {
        console.log(err);
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
