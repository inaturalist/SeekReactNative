// @flow

import React from "react";
import {
  View,
  Image,
  ScrollView,
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

  if ( match === true ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-match.png" )} />;
  } else if ( match === false ) {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-mismatch.png" )} />;
  } else {
    resultsIcon = <Image source={require( "../../assets/results/icn-results-unknown.png" )} />;
  }

  return (
    <View>
      <NavBar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.text}>{subtitle}</Text>
          <View style={styles.matchImage}>
            {resultsIcon}
          </View>
        </View>
        <View style={styles.imageBackground}>
          <View style={styles.imageCell}>
            <Image
              style={styles.imageContainer}
              source={{ uri: image.uri }}
            />
            { ( match === true || match === false ) ? (
              <Image
                style={styles.imageContainer}
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
          <Text style={styles.text}>{text}</Text>
          <TouchableHighlight style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => onPress( buttonText )}
            >
              {buttonText}
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChallengeResultsScreen;
