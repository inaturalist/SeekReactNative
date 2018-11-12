// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import Realm from "realm";

import badgeImages from "../assets/badges";
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
      badges: [{ id: 1, name: "bird" }, { id: 2, name: "quail" }]
    };
  }

  fetchBadges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" );
        console.log( badges, "badges in realm" );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    console.log( badgeImages, "badges imported from assets" );
    const { badges } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <NavBar navigation={navigation} />
        <FlatList
          data={ badges }
          scrollEnabled={false}
          keyExtractor={ badge => badge.id }
          numColumns={ 3 }
          renderItem={ ( { item } ) => (
            <View style={ styles.gridCell }>
              <TouchableOpacity
                onPress={ console.log( "you clicked a badge" )}
              >
                <View style={ styles.gridCellContents }>
                  <Image
                    source={badgeImages.cub.earnedIcon}
                  />
                  <View style={ styles.cellTitle }>
                    <Text style={ styles.cellTitleText }>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) }
        />
      </View>
    );
  }
}

export default BadgesScreen;
