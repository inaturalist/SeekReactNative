import React from "react";

import {
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/challenges";

const ChallengeGrids = ( { capitalizeNames, navigation, taxa } ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/background.png" )}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Species you&apos;re most likely to see near: </Text>
        <TouchableOpacity
          style={styles.locationChooser}
          onPress={() => navigation.navigate( "Loading" )}
        >
          <Text style={styles.locationChooserText}>Pick Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.taxonChooser}
          onPress={() => navigation.navigate( "Loading" )}
        >
          <Text style={styles.taxonChooserText}>Pick Taxon</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={ taxa }
        keyExtractor={ taxon => taxon.id }
        numColumns={ 3 }
        renderItem={ ( { item } ) => (
          <View style={ styles.gridCell }>
            <TouchableOpacity
              onPress={ ( ) => alert( "Button pressed" ) }
            >
              <View style={ styles.gridCellContents }>
                <Image
                  style={ {
                    width: "100%",
                    aspectRatio: 1.1
                  } }
                  source={ { uri: item.default_photo.medium_url } }
                />
                <View style={ styles.cellTitle }>
                  <Text style={ styles.cellTitleText }>
                    { capitalizeNames( item.preferred_common_name || item.name ) }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) }
      />
      <View style={styles.footer}>
        <Image source={ require( "../assets/profiles/icn-profile-egg.png" )} />
      </View>
    </ImageBackground>
  </View>
);

export default ChallengeGrids;
