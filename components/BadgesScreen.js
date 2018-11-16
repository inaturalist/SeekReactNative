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

type Props = {
  navigation: any
}

class BadgesScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      badges: [],
      title: ""
    };
  }

  componentDidMount() {
    this.fetchBadges();
  }

  fetchBadges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).sorted( "index" );
        const earned = badges.filtered( "earned == true" );
        if ( earned.length === 0 ) {
          this.setState( {
            title: "No Badges Earned"
          } );
        } else if ( earned.length === 1 ) {
          this.setState( {
            title: "1 Badge Earned!",
            badges
          } );
        } else {
          this.setState( {
            title: `${earned.length} Badges Earned!`,
            badges
          } );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { badges, title } = this.state;

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
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
