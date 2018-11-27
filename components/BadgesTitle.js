// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import Realm from "realm";

import realmConfig from "../models/index";
import { fontSize, fonts } from "../styles/global";

type Props = {
  navigation: any
}

class BadgesTitle extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
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
            title: "1 Badge Earned!"
          } );
        } else {
          this.setState( {
            title: `${earned.length} Badges Earned!`
          } );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { title } = this.state;
    return (
      <View>
        <Text style={{ fontFamily: fonts.default, fontSize: fontSize.header }}>{title}</Text>
      </View>
    );
  }
}

export default BadgesTitle;
