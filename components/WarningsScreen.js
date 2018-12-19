// @flow

import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  View
  // TouchableOpacity
} from "react-native";

import Button from "./Button";
import styles from "../styles/warnings";

type Props = {
  navigation: any
}

const tips = [
  { tip: "Always be aware of your surroundings and stay safe!" },
  { tip: "Don't eat anything you find in the wild." },
  { tip: "Don't trespass." },
  {
    tip: "Respect other living things by not harassing or touching them. Some may "
      + "sting, bite, or make you itch."
  }
];

const WarningsScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Seek!</Text>
        <Text style={styles.earnText}>
          Earn badges for taking photos of the plants and wildlife around you.
        </Text>
      </View>
      <View style={styles.tipContainer}>
        <FlatList
          data={tips}
          scrollEnabled={false}
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
      </View>
      <Button navigation={navigation} buttonText="OK. Got it!" />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push( "Main", { taxaName: null, id: null } )}
      >
        <Text style={styles.buttonText}>OK. Got it!</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  </View>
);

export default WarningsScreen;
