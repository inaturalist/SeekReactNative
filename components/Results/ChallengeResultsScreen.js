// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight
} from "react-native";

import NavBar from "../NavBar";
import styles from "../../styles/results";

type Props = {
  buttonText: string,
  image: Object,
  title: string,
  match: ?boolean,
  matchUrl: string,
  navigation: any,
  onPress: Function,
  photoText: string,
  subtitle: string,
  text: string,
  yourPhotoText: string
}

const ChallengeResultsScreen = ( {
  title,
  subtitle,
  match,
  matchUrl,
  text,
  buttonText,
  onPress,
  photoText,
  yourPhotoText,
  image,
  navigation
}: Props ) => {
  let resultsIcon;
  let photos;
  let captions;

  if ( match === true ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-match.png" )} />;
    photos = (
      <View style={styles.imageCell}>
        <Image
          style={styles.imageContainer}
          source={{ uri: image.uri }}
        />
        <Image
          style={styles.imageContainer}
          source={{ uri: matchUrl }}
        />
      </View> );
    captions = (
      <View style={styles.textCell}>
        <Text style={styles.captionText}>{yourPhotoText}</Text>
        <Text style={styles.captionText}>{photoText}</Text>
      </View> );
  } else if ( match === false ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-mismatch.png" )} />;
    photos = (
      <View style={styles.imageCell}>
        <Image
          style={styles.imageContainer}
          source={{ uri: image.uri }}
        />
        <Image
          style={styles.imageContainer}
          source={{ uri: matchUrl }}
        />
      </View> );
    captions = (
      <View style={styles.textCell}>
        <Text style={styles.captionText}>{yourPhotoText}</Text>
        <Text style={styles.captionText}>{photoText}</Text>
      </View> );
  } else {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-unknown.png" )} />;
    photos = (
      <View style={styles.imageCell}>
        <Image
          style={styles.imageContainer}
          source={{ uri: image.uri }}
        />
      </View> );
  };

  return (
    <View>
      <NavBar navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.text}>{subtitle}</Text>
        <View style={styles.matchImage}>
          {resultsIcon}
        </View>
      </View>
      <View style={styles.imageBackground}>
        {photos}
        {captions}
      </View>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableHighlight style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => onPress( buttonText )}
          >
            {buttonText}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChallengeResultsScreen;
