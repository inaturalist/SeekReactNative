// @flow

import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import Realm from "realm";

import badgeImages from "../assets/badges";
import realmConfig from "../models/index";
import styles from "../styles/badges";

class BadgesScreen extends Component {
  constructor() {
    super();

    this.state = {
      badges: []
    };
  }

  componentDidMount() {
    this.fetchBadges();
  }

  fetchBadges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).sorted( "index" );
        this.setState( {
          badges
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { badges } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={ badges }
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
                    <View style={ styles.gridCellContents }>
                      <Image
                        source={badgeIcon}
                        style={styles.badgeIcon}
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
    );
  }
}

export default BadgesScreen;
