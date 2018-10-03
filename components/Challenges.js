import React, { Component } from "react";
import inatjs from "inaturalistjs";

import {
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/challenges";

class Challenges extends Component {
  constructor() {
    super();

    this.state = {
      taxa: []
    };
  }

  componentDidMount() {
    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat: 37.7749, // San Francisco hardcoded for testing
      lng: -122.4194, // San Francisco hardcoded for testing
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029
    };

    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const challenges = response.results.map( r => r.taxon );
      this.setTaxa( challenges );
    } );
  }

  setTaxa( challenges ) {
    this.setState( {
      taxa: challenges
    } );
  }

  render() {
    const {
      taxa
    } = this.state;

    return (
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../assets/backgrounds/background.png" )}
        >
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
  }
}

export default Challenges;
