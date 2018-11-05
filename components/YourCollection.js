import React, { Component } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Realm from "realm";

import realmConfig from "../models/index";
import NavBar from "./NavBar";
import styles from "../styles/collection";

class YourCollection extends Component {
  constructor() {
    super();

    this.state = {
      badges: [],
      observations: []
    };
  }

  componentDidMount() {
    this.fetchDataFromRealm();
  }

  fetchDataFromRealm() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const badges = realm.objects( "BadgeRealm" );
        console.log( observations, "observations from Realm" );
        console.log( badges, "badges from Realm" );
      } )
      .catch( e => console.log( "Err: ", e ) );
  }

  render() {
    const {
      observations
    } = this.state;

    return (
      <View>
        <NavBar />
        <View style={styles.taxonGrid}>
          <FlatList
            data={ observations }
            scrollEnabled={false}
            keyExtractor={ taxon => taxon.id }
            numColumns={ 3 }
            renderItem={ ( { item } ) => (
              <View style={ styles.gridCell }>
                <TouchableOpacity
                  onPress={ () => console.log( "clicked" )}
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
                        Name of species
                        {/* { capitalizeNames( item.preferred_common_name || item.name ) } */}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) }
          />
        </View>
      </View>
    );
  }
};

export default YourCollection;
