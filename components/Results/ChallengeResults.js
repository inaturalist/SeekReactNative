import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight
} from "react-native";

import styles from "../../styles/results";

class ChallengeResults extends Component {
  constructor() {
    super();

    this.state = {
      headerText: "It's a match",
      text: "You saw a California Poppy",
      buttonText: "Add to collection",
      taxon: null,
      match: false,
      photoClear: false
    };
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
