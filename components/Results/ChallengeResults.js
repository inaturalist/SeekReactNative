// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight
} from "react-native";

import styles from "../../styles/results";

type Props = {
  navigation: any
}

class ChallengeResults extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { image } = navigation.state.params;

    this.state = {
      headerText: "It's a match",
      text: "You saw a California Poppy",
      buttonText: "Add to collection",
      taxon: null,
      match: false,
      photoClear: false,
      image
    };
  }

  componentDidMount() {
    console.log( this.state.image );
    this.resizeImage();
  }

  getCameraCaptureFromGallery() {
    // if user took a camera picture
    // this should grab the most recent photo in the gallery
    // first: 1

    // returns edges.node.image.uri
  }

  getPhotoTimeAndLocation() {
    // find current unix time
    // https://facebook.github.io/react-native/docs/cameraroll
    // edges.node.timestamp
    // edges.node.location.latitude -> truncate these
    // edges.node.location.longitude -> truncate these
  }

  resizeImage() {
    const { image } = this.state;
    console.log( image, 'in resize function' );
    // image.height = 299;
    // image.width = 299;

    // this.setState( {
    //   image
    // } );
  }

  scoreImage() {
    const params = {
      // lat: truncatedCoordinate -> is this user location?
      // lng: truncatedCoordinate
      // observed_on: date.timeIntervalSince1970 -> unix time?
    }

    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    // const data = image; -> need to access this image from gallery or camera
    // jwtStr = JWT.encode(claims: ["application": "ios"], algorithm: .hs512(AppConfig.visionSekret.data(using: .utf8)!))
    // https://api.inaturalist.org/v1/computervision/score_image
    // self.multiPartPostToUrl("https://api.inaturalist.org/v1/computervision/score_image", data: imageData, params: params, jwtStr: jwtStr, decodable: ScoreResponse.self, completion: completion)
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
