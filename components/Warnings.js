import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import styles from "../styles/warnings";

const tips = [
  { tip: "Always be aware of your surroundings and stay safe!" },
  { tip: "Don't eat anything you find in the wild." },
  { tip: "Don't trespass." },
  {
    tip: "Respect other living things by not harassing or touching them. Some may "
      + "sting, bite, or make you itch."
  }
];

const Warnings = () => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <Text style={styles.welcome}>Welcome to Seek!</Text>
      <Text style={styles.earn}>
        Earn badges for taking photos of the plants and wildlife around you.
      </Text>
      <View style={styles.container}>
        <View style={styles.tipContainer}>
          <FlatList
            data={tips}
            keyExtractor={( item, index ) => `${item}${index}`}
            renderItem={( { item } ) => (
              <View style={styles.tipList}>
                <Text style={styles.checkMark}>&#xf00c;</Text>
                <Text style={styles.tips}>{item.tip}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>
            We use your location to suggest plants and animals to find near you,
            but we blur the location before we use it so your street name and town
            or city is not identifiable
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("You pressed OK")}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default Warnings;
