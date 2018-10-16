import React from "react";

import {
  ScrollView,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import styles from "../../styles/taxonPicker";

const TaxonPicker = () => (
  <View style={{
    flex: 1
  }}
  >
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../../assets/backgrounds/background.png" )}
    >
      <View style={styles.header}>
        <Text>Show me...</Text>
      </View>
      <View style={styles.gridContainer}>
        <ScrollView
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
          scrollEnabled={false}
        >
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-all.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-plants.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-amphibians.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-fungi.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-fish.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-reptiles.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-arachnids.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-birds.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-insects.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-mollusks.png" )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageCell}
            underlayColor="transparent"
            onPress={() => console.log( "clicked image" )}
          >
            <Image
              style={styles.image}
              source={require( "../../assets/taxa/icn-iconic-taxa-mammals.png" )}
            />
          </TouchableHighlight>
        </ScrollView>
      </View>
    </ImageBackground>
  </View>
);

export default TaxonPicker;
