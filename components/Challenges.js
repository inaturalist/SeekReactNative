import React from "react";

import {
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Text,
  View
} from "react-native";

// import fetchTaxa from "./utilities";
import styles from "../styles/challenges";

const Challenges = ( ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/background.png" )}
    >
      <FlatList
        data={ [1, 3, 4, 6, 3, 3, 5, 6, 6, 7] }
        keyExtractor={ taxon => taxon.id }
        numColumns={ 3 }
        renderItem={ ( { item } ) => (
          <View style={ styles.gridCell }>
            <TouchableOpacity
              onPress={ ( ) => alert( "Button pressed") }
            >
              <View style={ styles.gridCellContents }>
                <Image
                  style={ {
                    width: "100%",
                    aspectRatio: 1.1
                  } }
                  source={ require( "../assets/logos/logo-seek-splash.png" ) }
                />
                <View style={ styles.cellTitle }>
                  <Text style={ styles.cellTitleText }>
                    { item.preferred_common_name || item.name }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) }
      />
    </ImageBackground>
  </View>
);

export default Challenges;
