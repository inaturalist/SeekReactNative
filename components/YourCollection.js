// @flow

import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Realm from "realm";

import ErrorScreen from "./ErrorScreen";
import badgeImages from "../assets/badges";
import realmConfig from "../models/index";
import styles from "../styles/collection";
import { recalculateBadges } from "../utility/helpers";

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
    recalculateBadges();
    this.fetchDataFromRealm();
  }

  fetchDataFromRealm() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const badges = realm.objects( "BadgeRealm" ).sorted( [["earnedDate", true], ["index", false]] );
        const firstBadges = badges.slice( 0, 3 );
        this.setState( {
          badges: firstBadges,
          observations
        } );
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
        <ScrollView>
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
                scrollEnabled={false}
                keyExtractor={ badge => badge.name }
                numColumns={ 3 }
                renderItem={ ( { item } ) => {
                  let badgeIcon;
                  let msg = item.infoText;
                  if ( item.earned ) {
                    msg = `${msg} You earned this badge.`;
                    badgeIcon = badgeImages[item.earnedIconName];
                  } else {
                    badgeIcon = badgeImages[item.unearnedIconName];
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
                        <View style={ styles.badgeCellContents }>
                          <Image
                            source={badgeIcon}
                            style={styles.badgeIcon}
                          />
                          <View style={ styles.badgeTitle }>
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
            {observations.length > 0
              ? <Text style={styles.headerText}>Species You&#39;ve Seen ({observations.length})</Text>
              : <Text style={styles.headerText}>Species You&#39;ve Seen</Text>
            }
            {observations.length > 0 ? (
              <View style={styles.taxonGrid}>
                <FlatList
                  data={ observations }
                  scrollEnabled={false}
                  keyExtractor={ t => t.taxon.id }
                  numColumns={ 3 }
                  renderItem={ ( { item } ) => (
                    <View style={ styles.gridCell }>
                      <TouchableOpacity
                        onPress={ () => navigation.push( "Species", {
                          id: item.taxon.id,
                          latitude: item.latitude,
                          longitude: item.longitude,
                          location: item.placeName,
                          seen: true,
                          commonName: item.taxon.preferredCommonName,
                          scientificName: item.taxon.name
                        } )}
                      >
                        <View style={ styles.gridCellContents }>
                          <Image
                            style={ {
                              width: "100%",
                              aspectRatio: 1.1
                            } }
                            source={ { uri: item.taxon.defaultPhoto.squareUrl } }
                          />
                          <View style={ styles.cellTitle }>
                            <Text style={ styles.cellTitleText } numberOfLines={2}>
                              { item.taxon.preferredCommonName || item.taxon.name }
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) }
                />
              </View>
            ) : (
              <View style={styles.noSpecies}>
                <ErrorScreen
                  error="Looks like you have not yet found any species nearby. Try taking a photo with the green plus button."
                  collection
                />
              </View>
            ) }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default YourCollection;
