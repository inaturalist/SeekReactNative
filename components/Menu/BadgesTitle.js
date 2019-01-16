// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import Realm from "realm";

import i18n from "../../i18n";
import realmConfig from "../../models";
import { fontSize, fonts } from "../../styles/global";

class BadgesTitle extends Component {
  constructor() {
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
            title: i18n.t( "badges.no_badges" )
          } );
        } else if ( earned.length === 1 ) {
          this.setState( {
            title: i18n.t( "badges.1_badge" )
          } );
        } else {
          this.setState( {
            title: i18n.t( "badges.many_badges", { defaultValue: "{{earnedLength}}", earnedLength: earned.length } )
          } );
        }
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
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
