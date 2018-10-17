import React from "react";
import { View, ImageBackground } from "react-native";

import styles from "../../styles/results";

const ChallengeResults = () => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../../assets/backgrounds/background.png" )}
    />
  </View>
);

export default ChallengeResults;
