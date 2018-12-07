// @flow

import React from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableHighlight
} from "react-native";

import styles from "../../styles/results";

type Props = {
  buttonText: string,
  image: Object,
  title: string,
  match: ?boolean,
  matchUrl: string,
  savePhotoOrStartOver: Function,
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
  savePhotoOrStartOver,
  photoText,
  yourPhotoText,
  image
}: Props ) => {
  let resultsIcon;

  if ( match === true ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-match.png" )} />;
  } else if ( match === false ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-mismatch.png" )} />;
  } else {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-unknown.png" )} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.text}>{subtitle}</Text>
        </View>
        <View style={styles.matchImage}>
          {resultsIcon}
        </View>
      </View>
      <View style={styles.imageBackground}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageCell}
            source={{ uri: image.uri }}
          />
          { ( match === true || match === false ) ? (
            <Image
              style={styles.imageCell}
              source={{ uri: matchUrl }}
            />
          ) : null }
        </View>
        { ( match === true || match === false ) ? (
          <View style={styles.textCell}>
            <Text style={styles.captionText}>{yourPhotoText}</Text>
            <Text style={styles.captionText}>{photoText}</Text>
          </View>
        ) : null }
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <TouchableHighlight style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => savePhotoOrStartOver()}
          >
            {buttonText}
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default ChallengeResultsScreen;
