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

import badges from "../assets/badges";
import realmConfig from "../models/index";
import NavBar from "./NavBar";
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
        console.log( badges, "badges in realm" );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { badges, title } = this.state;
    const { navigation } = this.props;

    let badgeIconName;

    badges.forEach( ( badge ) => {
      if ( badge.earned ) {
        badgeIconName = badge.earnedIconName;
      } else {
        badgeIconName = badge.unearnedIconName;
      }
    } );

    return (
      <View>
        <NavBar navigation={navigation} />
        <Text>{title}</Text>
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
    );
  }
}

export default BadgesScreen;
