// @flow

import React, { Component } from "react";
import {
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Realm from "realm";

import realmConfig from "../models/index";
import NavBar from "./NavBar";
import styles from "../styles/collection";

type Props = {
  navigation: any
}

class YourCollection extends Component {
  constructor( { navigation }: Props ) {
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
        this.setState( {
          badges,
          observations
        } );
        // console.log( observations, "observations on collection page" );
      } )
      .catch( e => console.log( "Err: ", e ) );
  }

  render() {
    const {
      observations,
      badges
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <View style={styles.badges}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Recent Badges</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate( "Badges" )}
            >
              <Text style={styles.text}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taxonGrid}>
            <FlatList
              data={ badges }
              keyExtractor={ badge => badge.name }
              numColumns={ 3 }
              renderItem={ ( { item } ) => {
                let msg = item.infoText;
                if ( item.earned ) {
                  msg = `${msg} You earned this badge.`;
                }
                return (
                  <View style={ styles.gridCell }>
                    <TouchableOpacity
                      onPress={ () => Alert.alert(
                        item.name,
                        msg,
                        [
                          {
                            text: "Got it!"
                          }
                        ],
                        { cancelable: false }
                      )}
                    >
                      <View style={ styles.gridCellContents }>
                        <Image
                          source={require( "../assets/badges/naturalist/badge_naturalist-03-tadpole.png" )}
                        />
                        <View style={ styles.cellTitle }>
                          <Text style={ styles.cellTitleText }>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            }
            />
          </View>
        </View>
        <View style={styles.species}>
          <Text style={styles.headerText}>Species You&#39;ve Seen ({observations.length})</Text>
          <View style={styles.taxonGrid}>
            <FlatList
              data={ observations }
              scrollEnabled={false}
              keyExtractor={ t => t.taxon.id }
              numColumns={ 3 }
              renderItem={ ( { item } ) => (
                <View style={ styles.gridCell }>
                  <TouchableOpacity
                    onPress={ () => navigation.navigate( "Species", {
                      id: item.taxon.id,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      location: item.placeName
                    } )}
                  >
                    <View style={ styles.gridCellContents }>
                      <Image
                        style={ {
                          width: "100%",
                          aspectRatio: 1.1
                        } }
                        source={ { uri: item.taxon.defaultPhoto.mediumUrl } }
                      />
                      <View style={ styles.cellTitle }>
                        <Text style={ styles.cellTitleText }>
                          { item.taxon.preferredCommonName || item.taxon.name }
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) }
            />
          </View>
        </View>
      </View>
    );
  }
}

export default YourCollection;
